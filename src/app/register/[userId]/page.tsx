"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  EclipseLogoTextOrbGlow,
  Input,
  SpinnerCenter,
  StarBackground,
} from "eclipse-components";
import Link from "next/link";

export default function Register({
  params,
}: Readonly<{ params: { userId: string } }>) {
  const { data: session, status: sessionStatus } = useSession();

  // can also do this to get url params
  // const params = useParams<{ userId: string }>();

  const router = useRouter();

  if (sessionStatus === "loading") {
    return <SpinnerCenter />;
  }

  if (sessionStatus === "unauthenticated" || !session?.user) {
    router.push(
      `https://auth.eclipseexpos.org/signup?callbackUrl=${encodeURIComponent(
        `https://dash.eclipseexpos.org/register/${params.userId}`
      )}`
    );

    return <SpinnerCenter />;
  }

  // else the user is authenticated
  return (
    <>
      <StarBackground />

      <main className="flex flex-col justify-start items-center min-h-screen w-screen p-24">
        <EclipseLogoTextOrbGlow />

        <div className="flex flex-col w-full max-w-lg gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-normal">
              Welcome, {session.user.name}!
            </h1>
            <p className="text-muted-foreground text-sm tracking-wide">
              {/** Note that 'text-muted-foreground' is from the component library */}
              Register as: <u>{session.user.email}</u>
            </p>
            or
            <Button asChild>
              <Link href="/logout">Logout</Link>
            </Button>
          </div>

          <Input
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Please enter your first name"
            className="w-full bg-background" /** Note that 'bg-background' is from the component library */
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Please enter your last name"
            className="w-full bg-background" /** Note that 'bg-background' is from the component library */
          />
        </div>
      </main>
    </>
  );
}
