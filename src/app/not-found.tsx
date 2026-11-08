import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="library">
      <p className="eyebrow">A page gone astray</p>
      <h1>This tale is missing.</h1>
      <Link className="button" href="/">
        Return to sessions
      </Link>
    </main>
  );
}
