"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import Email from "next-auth/providers/email";
// redundant, will optimize later
export async function isRegistered() {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
        return false;
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },

    });
    if (!user) {
        return false
    }
    const status = await prisma.mailingList.findUnique({
        where: {
            userId: user.id
        }
    })
    console.log("status is");
    console.log(status);
    if (status?.preRegistered) {
        return true;
    }
    return false;
}

export async function preRegister() {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
        return false;
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });
    const status = await prisma.mailingList.update({
        where: {
            id: user?.id
        },
        data: {
            preRegistered: true,

        }
    })
    if (status){revalidatePath("/settings");}

}
export async function unRegister() {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
        return false;
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });
    const status = await prisma.mailingList.update({
        where: {
            id: user?.id
        },
        data: {
            preRegistered: false,

        }
    })
    console.log(status);
    if (status){revalidatePath("/settings");}

}