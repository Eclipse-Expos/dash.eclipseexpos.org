"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

/**
 * Logout page
 * @returns JSX.Element
 */
export default function Logout() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    signOut({ redirect: false });

    // set a timeout to redirect to the callback url
    setTimeout(() => {
      window.location.href = searchParams.get("callbackUrl") || "/";
    }, 500);
  }, []);

  return <h1>Logging Out...</h1>;
}
