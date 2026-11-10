"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { narrationAudioUrl } from "@/lib/urls";

type Props = {
  path: string;
  paused: boolean;
  playbackKey: number;
  onStart: () => void;
};

export function NarrationAudio({ path, paused, playbackKey, onStart }: Props) {
  const audio = useRef<HTMLAudioElement>(null);
  const lastPlayback = useRef(playbackKey);
  const [enabled, setEnabled] = useState(false);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  const play = useCallback((element: HTMLAudioElement) => {
    void element.play().catch((error: unknown) => {
      if (
        audio.current !== element ||
        (error instanceof DOMException && error.name === "AbortError")
      )
        return;
      setFailed(true);
      setEnabled(false);
    });
  }, []);

  useEffect(() => {
    const element = audio.current;
    return () => element?.pause();
  }, []);

  useEffect(() => {
    const element = audio.current;
    if (!element) return;
    if (lastPlayback.current !== playbackKey) {
      lastPlayback.current = playbackKey;
      element.currentTime = 0;
    }
    if (!enabled || paused) element.pause();
    else if (element.paused && !element.ended) play(element);
  }, [enabled, paused, playbackKey, play]);

  const toggle = () => {
    const element = audio.current;
    if (!element) return;
    if (enabled && !finished) {
      element.pause();
      element.currentTime = 0;
      setEnabled(false);
      return;
    }
    setFailed(false);
    if (element.error) element.load();
    onStart();
    setEnabled(true);
    play(element);
  };

  return (
    <div className="scene-audio">
      <audio
        ref={audio}
        src={narrationAudioUrl(path)}
        preload="none"
        onPlay={() => setFinished(false)}
        onEnded={() => setFinished(true)}
      />
      <button type="button" onClick={toggle}>
        {enabled && !finished ? "Stop narration" : "Play narration"}
      </button>
      {failed && <p role="status">Narration could not play. Try again.</p>}
    </div>
  );
}
