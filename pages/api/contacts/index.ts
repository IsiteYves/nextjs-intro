import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export default async (req: NextRequest, res: NextResponse) => {
  if (req?.method == "POST") {
    const contactData = JSON.parse(req.body);

    const savedContact = await prisma?.contact.create({
      data: contactData,
    });

    return res.json(savedContact);
  }
  if (req.method == "GET") {
    const prisma = new PrismaClient();
    const contacts = await prisma?.contact.findMany();
    return res.status(200).json(contacts);
  }
  return res.status(405).end({ message: "Method not allowed" });
};
