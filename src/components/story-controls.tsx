import type { Session } from "@/lib/schema";
type Props = {
  session: Session;
  index: number;
  paused: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePause: () => void;
  onReplay: () => void;
  onSelect: (index: number) => void;
};
function ControlIcon({
  name,
}: {
  name: "previous" | "next" | "pause" | "resume" | "replay";
}) {
  return (
    <svg
      className="control-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "previous" && <path d="m14 5-7 7 7 7M7 12h13" />}
      {name === "next" && <path d="m10 5 7 7-7 7M17 12H4" />}
      {name === "pause" && (
        <>
          <path d="M8 5v14M16 5v14" />
        </>
      )}
      {name === "resume" && <path d="m8 4 12 8-12 8Z" />}
      {name === "replay" && (
        <>
          <path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" />
        </>
      )}
    </svg>
  );
}
export function StoryControls({
  session,
  index,
  paused,
  onPrevious,
  onNext,
  onTogglePause,
  onReplay,
  onSelect,
}: Props) {
  return (
    <nav className="player-controls" aria-label="Story controls">
      <button
        onClick={onPrevious}
        disabled={index === 0}
        aria-label="Previous scene"
        title="Previous scene (Left arrow)"
      >
        <ControlIcon name="previous" />
        <span className="control-label">Previous</span>
      </button>
      <button
        onClick={onTogglePause}
        aria-pressed={paused}
        aria-label={paused ? "Resume" : "Pause"}
        title={paused ? "Resume (Space)" : "Pause (Space)"}
      >
        <ControlIcon name={paused ? "resume" : "pause"} />
        <span className="control-label">{paused ? "Resume" : "Pause"}</span>
      </button>
      <button onClick={onReplay} aria-label="Replay" title="Replay this scene">
        <ControlIcon name="replay" />
        <span className="control-label">Replay</span>
      </button>
      <label className="scene-selector">
        <span className="visually-hidden">Go to scene</span>
        <select
          aria-label="Go to scene"
          value={index}
          onChange={(event) => onSelect(Number(event.target.value))}
        >
          {session.scenes.map((scene, i) => (
            <option key={scene.id} value={i}>
              {i + 1}. {scene.title}
            </option>
          ))}
        </select>
      </label>
      <button
        onClick={onNext}
        disabled={index === session.scenes.length - 1}
        aria-label="Next scene"
        title="Next scene (Right arrow)"
      >
        <span className="control-label">Next</span>
        <ControlIcon name="next" />
      </button>
    </nav>
  );
}
