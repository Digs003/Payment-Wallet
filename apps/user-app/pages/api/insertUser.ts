// pages/api/insertUser.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name, number } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name, 
        number,
      },
    });
    return res.status(200).json(newUser);
  } catch (error) {
    console.error('Failed to insert user:', error);
    return res.status(500).json({ error: 'Failed to insert user' });
  }
};