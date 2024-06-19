"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

/**
 * Get the current session user
 * @returns prisma user
 */
export async function getSessionUser() {
  const session = await getServerSession();
  const email = session?.user?.email;

  console.log(session);

  // If no email, return null
  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}
