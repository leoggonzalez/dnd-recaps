"use client";
/* eslint-disable @next/next/no-img-element -- Preoptimized WebP served through recap-scoped Blob URLs. */
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import type { Session } from "@/lib/schema";
import { poseIntervals } from "@/lib/timeline";
import { actorEntranceDelays } from "@/lib/scene-entrance";
import type { AssetStore } from "@/lib/asset-store";
type Props = {
  session: Session;
  index: number;
  store: AssetStore;
  onReady: () => void;
  paused: boolean;
};
export function LayeredStage({
  session,
  index,
  store,
  onReady,
  paused,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);
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
        aria-label={`Illustration in progress. Planned scene: ${scene.description}`}
      >
        <div className="placeholder-border">
          <span className="eyebrow">Illustration in progress</span>
          <span className="chapter-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{scene.title}</span>
        </div>
      </div>
    );

  const layerDelay = 260;
  const lastRevealDelay = Math.max(
    (environment.layers.length - 1) * layerDelay,
    ...entranceDelays.values(),
  );
  // Reserve half the horizontal travel for drift and half for the pointer.
  const pointerLimit =
    Math.min(environment.cameraLimit, environment.overscan) / 2;
  const verticalLimit = Math.min(
    pointerLimit,
    environment.overscan * (1080 / 1920),
  );
  function moveCamera(event: PointerEvent<HTMLDivElement>) {
    if (!entranceComplete || paused || failed || event.pointerType !== "mouse")
      return;
    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    const x = Math.max(
      -1,
      Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1),
    );
    const y = Math.max(
      -1,
      Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1),
    );
    const scale = bounds.width / 1920;
    stage.style.setProperty("--pointer-x", `${-x * pointerLimit * scale}px`);
    stage.style.setProperty("--pointer-y", `${-y * verticalLimit * scale}px`);
  }

  return (
    <div
      className="illustration-stage"
      ref={ref}
      role="img"
      aria-label={scene.description}
      data-scene={scene.id}
      data-entrance-complete={entranceComplete}
      onAnimationEnd={(event) => {
        if (
          event.animationName === "ink-bloom" &&
          event.target instanceof HTMLElement &&
          event.target.hasAttribute("data-entrance-end")
        ) {
          setEntranceComplete(true);
        }
      }}
      onPointerMove={moveCamera}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty("--pointer-x");
        event.currentTarget.style.removeProperty("--pointer-y");
      }}
    >
      {scene.actors.some((actor) => actor.effect === "invisibility") && (
        <svg
          width="0"
          height="0"
          aria-hidden="true"
          className="visually-hidden"
        >
          <defs>
            <filter id="invisibility-rim" colorInterpolationFilters="sRGB">
              <feComponentTransfer in="SourceAlpha" result="silhouette">
                <feFuncA type="linear" slope="8" intercept="-3" />
              </feComponentTransfer>
              <feMorphology
                in="silhouette"
                operator="dilate"
                radius="1.25"
                result="expanded"
              />
              <feComposite
                in="expanded"
                in2="silhouette"
                operator="out"
                result="rim"
              />
              <feFlood floodColor="#9edaff" floodOpacity="0.72" result="blue" />
              <feComposite in="blue" in2="rim" operator="in" result="outline" />
              <feComponentTransfer in="SourceGraphic" result="body">
                <feFuncA type="linear" slope="0.27" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="body" />
                <feMergeNode in="outline" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      )}
      {environment.layers.map((layer, i) => (
        <div
          className="environment-layer"
          key={layer.slot}
          style={
            {
              zIndex: layer.zIndex,
              inset: `${(-environment.overscan / 1920) * 100}%`,
              "--parallax-depth": (i + 1) / environment.layers.length,
              "--camera-x": `${(((i + 1) * Math.min(8, pointerLimit / environment.layers.length)) / (1920 + 2 * environment.overscan)) * 100}%`,
              "--scene-duration": `${scene.durationMs}ms`,
            } as CSSProperties
          }
        >
          <div
            className="ink-reveal"
            data-reveal={layer.slot}
            data-entrance-end={i * layerDelay === lastRevealDelay || undefined}
            style={
              {
                "--ink-delay": `${i * layerDelay}ms`,
                translate:
                  layer.slot === "middle" && layer.offsetY
                    ? `0 ${(layer.offsetY / 1080) * 100}%`
                    : undefined,
              } as CSSProperties
            }
          >
            <img src={store.url(layer.assetId)} alt="" draggable={false} />
          </div>
        </div>
      ))}
      {scene.actors.map((actor) => {
        const base = session.assets.find((a) => a.id === actor.assetId)!;
        const height = (actor.width * base.height) / base.width;
        const motion = actor.motion;
        const poseDuration = actor.poseLoopMs ?? scene.durationMs;
        const intervals = poseIntervals(actor, poseDuration);
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
              opacity: actor.opacity,
              transform: `translate(${-base.anchor.x * 100}%,${-base.anchor.y * 100}%)`,
            }}
          >
            <div
              className="ink-reveal"
              data-reveal={actor.id}
              data-entrance-end={
                entranceDelays.get(actor.id) === lastRevealDelay || undefined
              }
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
                        filter:
                          actor.effect === "invisibility"
                            ? "url(#invisibility-rim)"
                            : undefined,
                        scale: actor.flipX ? "-1 1" : undefined,
                        animationName: name,
                        animationDuration: `${poseDuration}ms`,
                        animationIterationCount: actor.poseLoopMs
                          ? "infinite"
                          : undefined,
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
