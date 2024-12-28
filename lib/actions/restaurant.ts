"use server";

import { Restaurant } from "@/models/Restaurant";
import dbConnect from "@/lib/db/mongoose";
import { getSession } from "@/lib/session";

export async function getRestaurantData() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return { error: "Not authenticated" };
    }

    if (!session.restaurantId) {
      return { error: "No restaurant associated with this account" };
    }

    await dbConnect();

    const restaurant = await Restaurant.findById(session.restaurantId).select(
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
