import { NextApiRequest, NextApiResponse } from 'next';

import { getSessionUser } from "@/lib/user/getSessionUser";
import {sendEmail} from '@/lib/email';
import {prisma} from '@/server/db';


export async function POST(req: NextApiRequest) {

  console.log(req.body);
  const {email} = await req.json();

  if (!email) {
    return new Response("Email is required", { status: 400 });
  }

  // create a user with the given email

  const currentUser = await getSessionUser();

  await prisma.user.create({
    data:{
      email: email,
      referralId: currentUser?.id,

    }
  })

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const link = `${process.env.NEXT_PUBLIC_SITE_URL}/register/${user?.id}`;

  await sendEmail(
    email,
    "Welcome to Eclipse Expos",
    `Welcome to Eclipse Expos! You have invited to register. Click here to register: ${link}`,
  );

  return new Response("User created", { status: 200 });


}