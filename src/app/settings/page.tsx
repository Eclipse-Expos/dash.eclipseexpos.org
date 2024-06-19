import { getSessionUser } from "@/lib/user/getSessionUser";
import Link from "next/link";
import Client from "./_components/Client";
import { prisma } from "@/lib/prisma";

/**
 * Settings Page element
 * @returns JSX.element
 */
export default async function Settings() {
  const user = await prisma.user.findUnique({
    where: {
      id: (await getSessionUser())?.id,
    },
    include: {
      mailingList: true,
    },
  });

  return user ? (
    <Client user={user} />
  ) : (
    <Link
      href={`${process.env.AUTH_DOMAIN}/login?callbackUrl=${process.env.DASH_DOMAIN}`}
      className="underline"
    >
      Login
    </Link>
  );
}
