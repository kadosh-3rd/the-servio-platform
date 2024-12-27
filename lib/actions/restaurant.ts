"use server";

import { cookies } from "next/headers";
import { Restaurant } from "@/models/Restaurant";
import dbConnect from "@/lib/db/mongoose";
import jwt from "jsonwebtoken";

interface JwtPayload {
  restaurantId: string;
}

export async function getRestaurantData() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return { error: "Not authenticated" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded.restaurantId) {
      return { error: "Invalid token" };
    }

    await dbConnect();

    const restaurant = await Restaurant.findById(decoded.restaurantId).select(
      "-password"
    );
    if (!restaurant) {
      return { error: "Restaurant not found" };
    }

    return {
      success: true,
      data: {
        businessName: restaurant.businessName,
        ownerName: restaurant.ownerName,
        email: restaurant.email,
        phoneNumber: restaurant.phoneNumber,
        address: restaurant.address,
        licenseNumber: restaurant.licenseNumber,
        createdAt: restaurant.createdAt,
      },
    };
  } catch (error) {
    console.error("Error getting restaurant data:", error);
    return { error: "Failed to get restaurant data" };
  }
}
