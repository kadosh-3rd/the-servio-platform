"use server";

import { Restaurant } from "@/models/Restaurant";
import dbConnect from "@/lib/mongoose";
import { registerSchema, loginSchema } from "@/lib/validations/auth";
import { getSession } from "@/lib/session";
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

    // Get session and set user data
    const session = await getSession();
    session.userId = restaurant._id.toString();
    session.restaurantId = restaurant._id.toString();
    session.role = "OWNER";
    session.isLoggedIn = true;
    await session.save();

    // Check if profile is complete
    const isComplete = Boolean(
      restaurant.name &&
        restaurant.cuisine?.length > 0 &&
        restaurant.settings?.currency &&
        restaurant.settings?.timezone &&
        restaurant.businessHours?.length > 0 &&
        restaurant.menu?.categories?.length > 0
    );

    return {
      success: true,
      message: "Login successful!",
      data: {
        redirectUrl: isComplete ? "/dashboard" : "/setup",
      },
    };
  } catch (error: any) {
    return {
      error: error.message || "Login failed",
    };
  }
}

export async function logoutRestaurant(): Promise<ActionResponse> {
  try {
    const session = await getSession();
    session.destroy();

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
