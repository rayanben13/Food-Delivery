"use server";

import { signOut } from "@/src/auth";

async function Logout() {
  await signOut();
}

export default Logout;
