import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

export default function Register({
  params,
}: Readonly<{ params: { userId: string } }>) {
  const { data: session, status: sessionStatus } = useSession();

  // can also do this to get url params
  // const params = useParams<{ userId: string }>();

  const router = useRouter();

  if (sessionStatus === "loading") {
    return <div>Loader goes here</div>;
  }

  if (sessionStatus === "unauthenticated" || !session) {
    router.push(
      `https://auth.eclipseexpos.org/login?callbackUrl=${encodeURIComponent(
        `https://dash.eclipseexpos.org/register/${params.userId}`
      )}`
    );

    return <div>Loader goes here</div>;
  }

  // else the user is authenticated
  return <></>;
}
