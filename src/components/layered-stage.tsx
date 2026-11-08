"use client";
/* eslint-disable @next/next/no-img-element -- Preoptimized WebP served through recap-scoped Blob URLs. */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Session } from "@/lib/schema";
import { poseIntervals } from "@/lib/timeline";
import { actorEntranceDelays } from "@/lib/scene-entrance";
import type { AssetStore } from "@/lib/asset-store";
type Props = {
  session: Session;
  index: number;
  store: AssetStore;
  onReady: () => void;
};
export function LayeredStage({ session, index, store, onReady }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const scene = session.scenes[index];
  const entranceDelays = actorEntranceDelays(session, scene);
  const environment = session.environments.find(
    (e) => e.id === scene.environmentId,
  );
  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    const images = Array.from(ref.current?.querySelectorAll("img") ?? []);
    Promise.all(images.map((image) => image.decode()))
      .then(() => {
        if (!cancelled)
          frame = requestAnimationFrame(() => {
            if (!cancelled) onReady();
          });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          onReady();
        }
      });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [onReady]);
  if (!environment || scene.artwork === "planned")
    return (
      <div
        ref={ref}
        className="stage-placeholder"
        role="img"
        aria-label={`Artwork in preparation. Planned scene: ${scene.description}`}
      >
        <div className="placeholder-border">
          <span className="eyebrow">Illustration in preparation</span>
          <span className="chapter-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{scene.title}</span>
        </div>
      </div>
    );

  return (
    <div
      className="illustration-stage"
      ref={ref}
      role="img"
      aria-label={scene.description}
      data-scene={scene.id}
    >
      {environment.layers.map((layer, i) => (
        <div
          className="environment-layer"
          key={layer.slot}
          style={
            {
              zIndex: layer.zIndex,
              inset: `${(-environment.overscan / 1920) * 100}%`,
              "--camera-x": `${(((i + 1) * 8) / 1920) * 100}%`,
              "--scene-duration": `${scene.durationMs}ms`,
            } as CSSProperties
          }
        >
          <div
            className="ink-reveal"
            data-reveal={layer.slot}
            style={{ "--ink-delay": `${i * 260}ms` } as CSSProperties}
          >
            <img src={store.url(layer.assetId)} alt="" draggable={false} />
          </div>
        </div>
      ))}
      {scene.actors.map((actor) => {
        const base = session.assets.find((a) => a.id === actor.assetId)!;
        const height = (actor.width * base.height) / base.width;
        const motion = actor.motion;
        const intervals = poseIntervals(actor, scene.durationMs);
        return (
          <div
            className="actor-position"
            key={actor.id}
            data-actor={actor.id}
            style={{
              left: `${(actor.position.x / 1920) * 100}%`,
              top: `${(actor.position.y / 1080) * 100}%`,
              width: `${(actor.width / 1920) * 100}%`,
              height: `${(height / 1080) * 100}%`,
              zIndex: actor.zIndex,
              transform: `translate(${-base.anchor.x * 100}%,${-base.anchor.y * 100}%)`,
            }}
          >
            <div
              className="ink-reveal"
              data-reveal={actor.id}
              style={
                {
                  "--ink-delay": `${entranceDelays.get(actor.id)}ms`,
                } as CSSProperties
              }
            >
              <div
                className={`actor-motion ${motion ? `motion-${motion.preset}` : ""}`}
                style={
                  motion
                    ? ({
                        "--from-x": `${(motion.from.x / actor.width) * 100}%`,
                        "--from-y": `${(motion.from.y / height) * 100}%`,
                        "--to-x": `${(motion.to.x / actor.width) * 100}%`,
                        "--to-y": `${(motion.to.y / height) * 100}%`,
                        animationDelay: `${motion.delayMs}ms`,
                        animationDuration: `${motion.durationMs}ms`,
                        animationTimingFunction: motion.easing,
                      } as CSSProperties)
                    : undefined
                }
              >
                {intervals.map((pose, p) => {
                  const name = `pose-${session.id}-${scene.id}-${actor.id}-${p}`;
                  return (
                    <img
                      key={name}
                      className={`actor-pose${pose.final ? " final-pose" : ""}`}
                      data-pose={pose.assetId}
                      src={store.url(pose.assetId)}
                      alt=""
                      draggable={false}
                      style={{
                        animationName: name,
                        animationDuration: `${scene.durationMs}ms`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {failed && (
        <p className="stage-error" role="alert">
          The illustration could not be prepared. Replay to retry.
        </p>
      )}
    </div>
  );
}
