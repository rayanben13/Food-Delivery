"use client";

import { Session } from "next-auth";
import { Button, Box } from "@mui/material";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface Props {
  initialSession: Session | null;
}

export default function AuthButton({ initialSession }: Props) {
  // no useSession
  // no loading
  // no flicker

  if (!initialSession) {
    return (
      <Box display="flex" gap={1}>
        <Link href="/auth/signin">
          <Button variant="contained">Sign in</Button>
        </Link>
        <Link href="/auth/signup">
          <Button variant="outlined">Sign up</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Button
      color="error"
      variant="outlined"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </Button>
  );
}
