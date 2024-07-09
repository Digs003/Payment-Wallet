"use server";

import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export async function Signup(email: string, name: string, password: string) {
  if (!email || !name || !password) {
    return { error: "Missing required fields" };
  }
  try {
    const existing_user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existing_user) {
      return { error: "User already exists" };
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedpassword,
      },
    });

    return { message: "User created successfully" };
  } catch (e) {
    console.error(e);
    return { error: "Error creating user" };
  }
}
