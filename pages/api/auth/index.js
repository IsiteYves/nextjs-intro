import { NextRequest, NextResponse } from "next/server";
import { jwt_secret } from "../../../config/index";
import jwt from "jsonwebtoken";

export default function (req, res) {
  const reqbody = JSON.parse(req?.body.toString());
  if (!reqbody?.email || !reqbody?.password) {
    return res.status(400).send({
      message: "Please provide valid data with 'email' and 'password",
    });
  }
  const { email, password } = reqbody;
  if (email !== "eric@gmail.com" || password !== "eric")
    return res.status(400).send({ message: "Invalid email or password" });
  const token = jwt.sign(
    { email, isEric: email === "eric@gmail.com" ? true : false },
    jwt_secret
  );
  return res.status(200).json({ token, message: "" });
}
