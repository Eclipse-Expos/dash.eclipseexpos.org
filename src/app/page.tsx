"use server";

import { getSessionUser } from "@/lib/user/getSessionUser";
import Link from "next/link";

/**
 * Home Page element
 * @returns JSX.element
 */
export default async function Home() {
  const user = await getSessionUser();

  return (
    <main className="p-4 text-center">
      <h1 className="text-3xl">
        {user ? `Welcome ${user.firstName}` : "Not logged in."}
      </h1>
      {user ? (
        <Link href={`/logout`} className="underline">
          Logout
        </Link>
      ) : (
        <Link href={`${process.env.AUTH_DOMAIN}/login?callbackUrl=${process.env.DASH_DOMAIN}`} className="underline">
          Login
        </Link>
      )}
    </main>
  );
}
