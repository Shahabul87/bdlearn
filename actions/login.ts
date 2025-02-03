"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { 
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { 
  generateVerificationToken,
  generateTwoFactorToken
} from "@/lib/tokens";
import { 
  getTwoFactorConfirmationByUserId
} from "@/data/two-factor-confirmation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  console.log("Login action called with:", { values, callbackUrl });
  
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation error:", validatedFields.error);
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);
    console.log("Found user:", existingUser);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      console.log("Invalid credentials - user not found or missing email/password");
      return { error: "Invalid credentials!" }
    }

    if (!existingUser.emailVerified) {
      console.log("Email not verified");
      const verificationToken = await generateVerificationToken(
        existingUser.email,
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );

      return { success: "Confirmation email sent!" };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      console.log("2FA is enabled, checking code");
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );

        if (!twoFactorToken) {
          return { error: "Invalid code!" };
        }

        if (twoFactorToken.token !== code) {
          return { error: "Invalid code!" };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return { error: "Code expired!" };
        }

        await db.twoFactorToken.delete({
          where: { id: twoFactorToken.id }
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id }
          });
        }

        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          }
        });

        return signIn("credentials", {
          email,
          password,
          redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
      } else {
        try {
          console.log("Generating 2FA token for:", existingUser.email);
          const twoFactorToken = await generateTwoFactorToken(existingUser.email);
          console.log("Generated token:", twoFactorToken);
          
          await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token,
          );
          
          return { twoFactor: true };
        } catch (error) {
          console.error("2FA setup error:", error);
          return { error: "Failed to send verification code. Please try again." };
        }
      }
    }

    return signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
};