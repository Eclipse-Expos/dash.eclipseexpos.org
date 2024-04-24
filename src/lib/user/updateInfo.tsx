"use server"
import { getSessionUser } from "@/lib/user/getSessionUser";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";

   export const UpdateInfo = async (formData: FormData)=>{
    
    const user = await getSessionUser();
    const status = await prisma.user.update({
        where: { 
            id: user?.id
        },
        data: {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,

        }
    })
    if (status) { revalidatePath("/") }
    }

