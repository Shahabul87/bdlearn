// pages/api/register.ts

import { NextResponse } from "next/server";
import * as z from "zod";
import { hash } from "bcryptjs";

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
        { error: "Invalid fields!" },
        { status: 400 }
      );
    }

    // Map input fields to match the user model
    const { name, email, password } = validatedFields.data;

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists!" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    // Generate verification token and send a verification email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    // Return success response
    return NextResponse.json({ 
      user: {
        name: user.name,
        email: user.email,
      }
    }, { status: 201 });
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

