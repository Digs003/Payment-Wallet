"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function addNumber(number:string){
    const session=await getServerSession(authOptions);
    try{
        await prisma.user.update({
            where:{
                email:session?.user?.email
            },
            data:{
                number:number
            }
        });
        return {
            message:"Number added successfully",
        }
    }catch(e){
        return {
            error:"Error adding number"
        }
    }
    
}