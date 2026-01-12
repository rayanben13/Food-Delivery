import { auth } from "@/src/auth";
import Header from ".";

export default async function ServerHeader() {
  const session = await auth();
  return <Header initialSession={session} />;
}
