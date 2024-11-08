// pages/api/register.ts

import { NextResponse } from "next/server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export async function POST(req: Request) {
  try {
    // Parse and validate the request body using Zod schema
    const body = await req.json();
    const validatedFields = RegisterSchema.safeParse(body);

    console.log(validatedFields)
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid fields!", details: validatedFields.error.errors },
        { status: 400 }
      );
    }

    // Map input fields to match the user model
    const { Name: name, Email: email, "Choose a password": password, "Confirm password": confirmPassword } = validatedFields.data;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match!" }, { status: 400 });
    }

    // Check if the user already exists by email
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use!" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log(user)

    // Generate verification token and send a verification email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    // Return success response
    return NextResponse.json({ success: "Confirmation email sent!" });
  } catch (error) {
    console.error("[REGISTER]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

