import { notFound } from "next/navigation";
import { sessions } from "@/data";
import { RecapPlayer } from "@/components/recap-player";
export const dynamicParams = false;
export function generateStaticParams() {
  return sessions.map((session) => ({ sessionId: session.id }));
}
export default async function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const session = sessions.find((item) => item.id === sessionId);
  if (!session) notFound();
  return <RecapPlayer session={session} />;
}
