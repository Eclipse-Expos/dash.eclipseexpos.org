"use server";

import { getSessionUser } from "@/lib/user/getSessionUser";
import { isRegistered } from "@/lib/user/registration";
import Client from "@/components/refferal"
import Link from "next/link";

import {
  StarBackground,

} from 'eclipse-components'

/**
 * Home Page element
 * @returns JSX.element
 */
export default async function Home() {
  const user = await getSessionUser();
  const preRegistered = await isRegistered();
  return (

    <main className="p-4 text-left">
      {/* <StarBackground/> */}
      <h1 className="text-3xl">
        {user ? `Welcome ${user.firstName}!` : "Not logged in."}
      </h1>

      {user ? (
        <div>
          <Link href={`/logout`} className="underline">
            Logout
          </Link>
          <br />
          <Link href={`/settings`} className="underline">
            Settings
          </Link>
          <br />
          {preRegistered ? (
            <div>
            <p> You have preregistered, you can invite up to 10 of your friends! </p>
            <Client users={user?.referrals}/>
            </div> ) : ("You are not yet preregistered. ")}

        </div>
      ) : (
        <Link href={`${process.env.AUTH_DOMAIN}/login?callbackUrl=${process.env.DASH_DOMAIN}`} className="underline">
          Login
        </Link>
      )}

      <br />
    </main>
  );
}
