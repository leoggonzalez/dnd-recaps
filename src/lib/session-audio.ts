import type { Session } from "./schema";
import { audioAssetUrl } from "./urls";

const loopFadeSeconds = 1.25;
const cueFadeSeconds = 0.8;
const musicLevel = 0.22;
const silenceThreshold = 10 ** (-45 / 20);

type Music = {
  path: string;
  source: AudioBufferSourceNode;
  gain: GainNode;
  startedAt: number;
};

function crossfadeLoop(context: AudioContext, input: AudioBuffer) {
  const channels = Array.from(
    { length: input.numberOfChannels },
    (_, channel) => input.getChannelData(channel),
  );
  let start = 0;
  let end = input.length;
  while (
    start < end &&
    channels.every((data) => Math.abs(data[start]) < silenceThreshold)
  )
    start++;
  while (
    end > start &&
    channels.every((data) => Math.abs(data[end - 1]) < silenceThreshold)
  )
    end--;

  const overlap = Math.min(
    Math.round(loopFadeSeconds * input.sampleRate),
    Math.floor((end - start) / 3),
  );
  if (overlap < 2) return input;

  const output = context.createBuffer(
    channels.length,
    end - start - overlap,
    input.sampleRate,
  );
  const tail = end - overlap;
  const bodyLength = end - start - 2 * overlap;

  // Place the blend at the end. Its last sample leads into the unblended head.
  channels.forEach((data, channel) => {
    const samples = output.getChannelData(channel);
    samples.set(data.subarray(start + overlap, tail));
    for (let i = 0; i < overlap; i++) {
      const angle = (i / (overlap - 1)) * (Math.PI / 2);
      samples[bodyLength + i] =
        data[tail + i] * Math.cos(angle) + data[start + i] * Math.sin(angle);
    }
  });
  return output;
}

export function sessionAudioPaths(session: Session) {
  const paths = new Set<string>();
  for (const scene of session.scenes) {
    if (scene.narrationAudio) paths.add(scene.narrationAudio);
    if (scene.musicAudio) paths.add(scene.musicAudio);
  }
  return paths;
}

export class SessionAudio {
  private readonly downloads = new AbortController();
  private readonly buffers = new Map<string, AudioBuffer>();
  private readonly musicLoops = new Map<string, AudioBuffer>();
  private narration?: AudioBufferSourceNode;
  private music?: Music;

  constructor(readonly context: AudioContext) {}

  async preload(session: Session) {
    const music = new Set(session.scenes.map((scene) => scene.musicAudio));
    const narration = new Set(
      session.scenes.map((scene) => scene.narrationAudio),
    );
    const results = await Promise.allSettled(
      Array.from(sessionAudioPaths(session), async (path) => {
        const response = await fetch(audioAssetUrl(path), {
          signal: this.downloads.signal,
        });
        if (!response.ok) throw new Error(`Could not load audio: ${path}`);
        const buffer = await this.context.decodeAudioData(
          await response.arrayBuffer(),
        );
        if (this.downloads.signal.aborted) return;
        if (narration.has(path)) this.buffers.set(path, buffer);
        if (music.has(path))
          this.musicLoops.set(path, crossfadeLoop(this.context, buffer));
      }),
    );
    return results.some((result) => result.status === "rejected");
  }

  setNarration(path?: string) {
    this.narration?.stop();
    this.narration = undefined;
    const buffer = path ? this.buffers.get(path) : undefined;
    if (!buffer) return;

    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.context.destination);
    source.onended = () => {
      source.disconnect();
      if (this.narration === source) this.narration = undefined;
    };
    source.start();
    this.narration = source;
  }

  setMusic(path?: string) {
    if (this.music?.path === path) return;

    const now = this.context.currentTime;
    const end = now + cueFadeSeconds;
    const outgoing = this.music;
    if (outgoing) {
      const level =
        musicLevel * Math.min(1, (now - outgoing.startedAt) / cueFadeSeconds);
      outgoing.gain.gain.cancelScheduledValues(now);
      outgoing.gain.gain.setValueAtTime(level, now);
      outgoing.gain.gain.linearRampToValueAtTime(0, end);
      outgoing.source.stop(end);
    }
    this.music = undefined;

    const buffer = path ? this.musicLoops.get(path) : undefined;
    if (!path || !buffer) return;

    const source = this.context.createBufferSource();
    const gain = this.context.createGain();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gain).connect(this.context.destination);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(musicLevel, end);
    source.onended = () => {
      source.disconnect();
      gain.disconnect();
    };
    source.start(now);
    this.music = { path, source, gain, startedAt: now };
  }

  dispose() {
    this.downloads.abort();
    void this.context.close().catch(() => {});
  }
}
