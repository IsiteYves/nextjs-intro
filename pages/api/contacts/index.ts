import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async (req: NextRequest, res: NextResponse) => {
  if (req?.method == "POST") {
    const contactData = JSON.parse(req?.body.toString());

    const savedContact = await prisma?.contact.create({
      data: contactData,
    });

    return res.json(savedContact);
  }
  if (req.method == "GET") {
    const prisma = new PrismaClient();
    const contacts = await prisma?.contact.findMany();
    res.statusCode = 200;
    return res.send(contacts);
  }
  res.statusCode = 405;
  return res.end({ message: "Method not allowed" });
};
