"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function getUser(){
    const session = await getServerSession(authOptions);
    const user=await prisma.user.findUnique({
        where:{
            email: session?.user?.email
        }
    });
    return user;
}