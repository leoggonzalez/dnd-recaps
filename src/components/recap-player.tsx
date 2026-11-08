"use client";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { Session } from "@/lib/schema";
import { AssetStore, sceneAssetIds, type Progress } from "@/lib/asset-store";
import { LayeredStage } from "./layered-stage";
import { StoryControls } from "./story-controls";
import { SCENE_NARRATION_DELAY_MS } from "@/lib/scene-entrance";
export function RecapPlayer({ session }: { session: Session }) {
  const [index, setIndex] = useState(0);
  const [playbackKey, setPlaybackKey] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [stageReady, setStageReady] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [store, setStore] = useState<AssetStore | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "failed" | "ready">(
    "loading",
  );
  const [progress, setProgress] = useState<Progress>({
    ready: 0,
    total: 0,
    failed: 0,
  });
  const [preparing, setPreparing] = useState(false);
  const [prepareError, setPrepareError] = useState(false);
  const requested = useRef(0);
  const navigation = useRef(0);
  const storeRef = useRef<AssetStore | null>(null);
  const loadReady = useRef(false);
  const enter = useCallback(
    async (next: number, push = true) => {
      const safe = Math.max(0, Math.min(session.scenes.length - 1, next));
      requested.current = safe;
      const generation = ++navigation.current;
      if (push) setInvalidLink(false);
      setPrepareError(false);
      if (push)
        window.history.pushState(null, "", `#scene=${session.scenes[safe].id}`);
      const active = storeRef.current;
      if (!active || !loadReady.current) return;
      setPreparing(true);
      try {
        const destinations = [safe - 1, safe, safe + 1].filter(
          (i) => i >= 0 && i < session.scenes.length,
        );
        active.retainDecoded(
          destinations.flatMap((i) => sceneAssetIds(session, i)),
        );
        await active.prepare(sceneAssetIds(session, safe));
        if (generation !== navigation.current) return;
        setStageReady(false);
        setIndex(safe);
        setPlaybackKey((key) => key + 1);
        setPreparing(false);
        const neighbors = [safe - 1, safe, safe + 1].filter(
          (i) => i >= 0 && i < session.scenes.length,
        );
        const retain = neighbors.flatMap((i) => sceneAssetIds(session, i));
        active.retainDecoded(retain);
        // Neighbor failures are retried when that scene is requested.
        void active
          .prepare(retain)
          .then(() => {
            if (generation === navigation.current) active.retainDecoded(retain);
          })
          .catch(() => {});
      } catch {
        if (generation === navigation.current) {
          setPreparing(false);
          setPrepareError(true);
        }
      }
    },
    [session],
  );
  useEffect(() => {
    let cancelled = false;
    const active = new AssetStore(session);
    storeRef.current = active;
    queueMicrotask(() => {
      if (!cancelled) setStore(active);
    });

    const sync = () => {
      const id = new URLSearchParams(window.location.hash.slice(1)).get(
        "scene",
      );
      const found = session.scenes.findIndex((s) => s.id === id);
      void enter(Math.max(0, found), false);
      setInvalidLink(id !== null && found < 0);
    };
    const visibility = () => setHidden(document.hidden);
    sync();
    visibility();
    active
      .load(setProgress)
      .then(async () => {
        if (cancelled) return;
        await document.fonts.ready;
        if (cancelled) return;
        loadReady.current = true;
        await enter(requested.current, false);
        if (!cancelled) setLoadState("ready");
      })
      .catch(() => {
        if (!cancelled) setLoadState("failed");
      });
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    document.addEventListener("visibilitychange", visibility);
    const invalidateNavigation = () => {
      navigation.current += 1;
    };
    return () => {
      cancelled = true;
      invalidateNavigation();
      loadReady.current = false;

      active.dispose();
      storeRef.current = null;
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [session, enter]);
  const retry = async () => {
    if (!store) return;
    setLoadState("loading");
    try {
      await store.load(setProgress);
      await document.fonts.ready;
      loadReady.current = true;
      await enter(requested.current, false);
      setLoadState("ready");
    } catch {
      setLoadState("failed");
    }
  };
  const ready = useCallback(() => setStageReady(true), []);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (
        loadState !== "ready" ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      if (
        event.target instanceof Element &&
        event.target.closest(
          'button,a,input,select,textarea,[contenteditable="true"],[role="button"]',
        )
      )
        return;
      if (
        event.key === "ArrowRight" &&
        requested.current < session.scenes.length - 1
      ) {
        event.preventDefault();
        void enter(requested.current + 1);
      }
      if (event.key === "ArrowLeft" && requested.current > 0) {
        event.preventDefault();
        void enter(requested.current - 1);
      }
      if (event.code === "Space") {
        event.preventDefault();
        setUserPaused((value) => !value);
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [session, enter, loadState]);
  const scene = session.scenes[index];
  return (
    <main id="main" className="reader">
      <Link className="back-link" href="/">
        ← All sessions
      </Link>
      <header className="reader-header">
        <div>
          <p className="eyebrow">
            {session.displayDate} · {session.inWorldDate}
          </p>
          <h1>{session.title}</h1>
        </div>
        {loadState === "ready" && (
          <p className="scene-count" aria-live="polite" aria-atomic="true">
            Scene {index + 1} of {session.scenes.length}: {scene.title}
          </p>
        )}
      </header>
      {invalidLink && (
        <p role="status">
          That scene could not be found. Showing the first scene.
        </p>
      )}
      {loadState !== "ready" || !store ? (
        <section className="loading-card" aria-labelledby="loading-title">
          <p className="eyebrow">Gathering the pages</p>
          <h2 id="loading-title">
            {loadState === "failed"
              ? "Some illustrations could not load"
              : "Preparing the whole story"}
          </h2>
          <progress
            aria-label="Recap images ready"
            value={progress.ready}
            max={Math.max(1, progress.total)}
          />
          <p role="status">
            {progress.ready} of {progress.total} images ready
            {progress.failed ? ` · ${progress.failed} failed` : ""}
          </p>
          {loadState === "failed" && (
            <>
              <p>
                Successful downloads are saved for this visit. Retry to load the
                remaining images.
              </p>
              <button onClick={() => void retry()}>Retry images</button>
            </>
          )}
          <Link href="/">Return to sessions</Link>
        </section>
      ) : (
        <>
          {preparing && <p role="status">Preparing the next illustration…</p>}
          {prepareError && (
            <p role="alert">
              The next illustration could not be decoded.{" "}
              <button onClick={() => void enter(requested.current, false)}>
                Retry scene
              </button>
            </p>
          )}
          <div
            className="playback"
            data-ready={stageReady}
            style={
              {
                "--narration-delay": `${SCENE_NARRATION_DELAY_MS}ms`,
                "--play-state":
                  userPaused || hidden || !stageReady ? "paused" : "running",
              } as CSSProperties
            }
          >
            <div className="scene-player">
              <LayeredStage
                key={playbackKey}
                session={session}
                index={index}
                store={store}
                onReady={ready}
              />
              <StoryControls
                session={session}
                index={index}
                paused={userPaused}
                onPrevious={() => void enter(requested.current - 1)}
                onNext={() => void enter(requested.current + 1)}
                onTogglePause={() => setUserPaused((value) => !value)}
                onReplay={() => {
                  setStageReady(false);
                  setPlaybackKey((key) => key + 1);
                }}
                onSelect={(next) => void enter(next)}
              />
            </div>
            <section
              key={playbackKey}
              className="narration"
              aria-labelledby="scene-title"
            >
              <p className="eyebrow">{session.location}</p>
              <h2 id="scene-title">{scene.title}</h2>
              {scene.narration.map((line) => (
                <p
                  className="narration-line"
                  key={line.id}
                  style={{
                    animationDelay: `calc(var(--narration-delay) + ${line.delayMs}ms)`,
                    animationDuration: `${line.durationMs}ms`,
                  }}
                >
                  {line.text}
                </p>
              ))}
            </section>
          </div>
          {index === session.scenes.length - 1 && (
            <aside className="end-card">
              <p>The road goes on. This chapter ends here.</p>
              <button onClick={() => void enter(0)}>Replay session</button>
              <Link href="/">Return to sessions</Link>
            </aside>
          )}
        </>
      )}
      <footer>
        Work in progress · Illustrated prototypes: scenes 1–3 and 7.
      </footer>
    </main>
  );
}
