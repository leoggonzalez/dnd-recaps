import type { Metadata } from "next";
import "./globals.css";
import "./scene-poses.css";
export const metadata: Metadata = {
  title: "Whispers of Fire",
  description:
    "Tales from the road to Waterdeep. An illustrated D&D session journal.",
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
