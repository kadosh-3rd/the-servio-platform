import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectToDatabase } from "@/lib/database";
import { Restaurant } from "@/lib/models/restaurant";
import { verifyJwtToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await verifyJwtToken(token);

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    // Find restaurant by userId
    const restaurant = await Restaurant.findOne({ userId: decoded.userId });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    // Check if profile is complete
    const isComplete = Boolean(
      restaurant.name &&
      restaurant.cuisine?.length > 0 &&
      restaurant.settings?.currency &&
      restaurant.settings?.timezone &&
      restaurant.businessHours?.length > 0 &&
      restaurant.menu?.categories?.length > 0
    );

    return NextResponse.json({ isComplete });
  } catch (error) {
    console.error("Profile status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
