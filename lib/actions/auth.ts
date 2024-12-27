"use server";

import { cookies } from "next/headers";
import { Restaurant } from "@/models/Restaurant";
import dbConnect from "@/lib/db/mongoose";
import { registerSchema, loginSchema, signToken } from "@/lib/validations/auth";
import { z } from "zod";

export async function registerRestaurant(
  prevState: ActionResponse | null,
  formData: z.infer<typeof registerSchema>
): Promise<ActionResponse> {
  try {
    const validatedData = registerSchema.parse(formData);
    await dbConnect();

    const existingRestaurant = await Restaurant.findOne({
      email: validatedData.email,
    });

    if (existingRestaurant)
      return {
        error: "Email already exists",
      };

    await Restaurant.create(validatedData);
    return {
      success: true,
      message: "Registration successful!",
    };
  } catch (error: any) {
    return {
      error: error.message || "Registration failed",
    };
  }
}

export async function loginRestaurant(
  prevState: ActionResponse | null,
  formData: z.infer<typeof loginSchema>
): Promise<ActionResponse> {
  try {
    const validatedData = loginSchema.parse(formData);
    await dbConnect();

    const restaurant = await Restaurant.findOne({
      email: validatedData.email,
    }).select("+password");

    if (!restaurant)
      return {
        error: "Invalid credentials",
      };

    const isValidPassword = await restaurant.comparePassword(
      validatedData.password
    );
    if (!isValidPassword)
      return {
        error: "Invalid credentials",
      };

    const token = signToken({ restaurantId: restaurant._id });

    // Set HTTP-only cookie
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return {
      success: true,
      message: "Login successful!",
    };
  } catch (error: any) {
    return {
      error: error.message || "Login failed",
    };
  }
}

export async function logoutRestaurant(): Promise<ActionResponse> {
  try {
    (await cookies()).delete("token");
    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error: any) {
    return {
      error: error.message || "Logout failed",
    };
  }
}
