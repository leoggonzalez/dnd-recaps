/* eslint-disable @next/next/no-img-element -- Preoptimized published WebP. */
import Link from "next/link";
import { assetUrl } from "@/lib/urls";
import { sessions } from "@/data";
export default function Library() {
  return (
    <main id="main" className="library">
      <p className="eyebrow">A journal of unlikely company</p>
      <h1>
        Whispers{" "}
        <br />
        <em>of Fire</em>
      </h1>
      <p className="intro">
        Along the road to Waterdeep, every campfire has a story.
      </p>
      <div className="rule" aria-hidden="true">
        ✧
      </div>
      <section aria-label="Session library" className="sessions">
        {sessions.map((session) => (
          <article className="session-card" key={session.id}>
            <div className="cover-placeholder" aria-label="Session cover">
              {session.coverAssetId ? (
                <img
                  className="cover-image"
                  src={assetUrl(
                    session.assets.find((a) => a.id === session.coverAssetId)!
                      .path,
                  )}
                  alt="Illustrated woodland clearing at dusk"
                />
              ) : (
                <span aria-hidden="true">✧</span>
              )}
              <small>The road to Waterdeep</small>
            </div>
            <div className="session-details">
              <p className="eyebrow">
                Session {session.displayDate} · Draft preview
              </p>
              <h2>{session.title}</h2>
              <p>{session.summary}</p>
              <p className="session-meta">
                {session.inWorldDate}
                <br />
                {session.location}
              </p>
              <Link
                className="button primary"
                href={`/sessions/${session.id}/`}
              >
                Open the story <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </section>
      <footer>Nine moments from the road. Layered artwork in progress.</footer>
    </main>
  );
}
