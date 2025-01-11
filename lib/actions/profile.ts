"use server";

import { getSession } from "@/lib/session";
import { Restaurant } from "@/models/Restaurant";
import { MenuCategory } from "@/models/MenuCategory";
import { MenuItem } from "@/models/MenuItem";
import dbConnect from "@/lib/mongoose";
import { redirect } from "next/navigation";
import { z } from "zod";

const businessHoursSchema = z.object({
  day: z.number().min(0).max(6),
  open: z.string(),
  close: z.string(),
  isClosed: z.boolean().default(false),
});

const basicInfoSchema = z.object({
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  cuisine: z.array(z.string()),
  settings: z.object({
    currency: z.string(),
    timezone: z.string(),
    taxRate: z.number(),
    serviceCharge: z.number(),
  }),
});

const businessHoursUpdateSchema = z.object({
  businessHours: z.array(businessHoursSchema),
});

export async function updateBasicInfo(data: z.infer<typeof basicInfoSchema>) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.restaurantId) {
      redirect("/auth/login");
    }

    await dbConnect();

    const restaurant = await Restaurant.findByIdAndUpdate(
      session.restaurantId,
      {
        $set: {
          logo: data.logo,
          coverImage: data.coverImage,
          cuisine: data.cuisine,
          settings: {
            ...data.settings,
            allowReservations: true,
            requirePayment: false,
            autoAcceptOrders: true,
          },
        },
      },
      { new: true }
    );

    if (!restaurant) return { error: "Restaurant not found" };

    return { success: true, data: restaurant };
  } catch (error) {
    console.error("Error updating basic info:", error);
    return { error: "Failed to update basic information" };
  }
}

export async function updateBusinessHours(
  data: z.infer<typeof businessHoursUpdateSchema>
) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.restaurantId) {
      redirect("/auth/login");
    }

    await dbConnect();

    const restaurant = await Restaurant.findByIdAndUpdate(
      session.restaurantId,
      {
        $set: {
          businessHours: data.businessHours,
        },
      },
      { new: true }
    );

    if (!restaurant) return { error: "Restaurant not found" };

    return { success: true, data: restaurant };
  } catch (error) {
    console.error("Error updating business hours:", error);
    return { error: "Failed to update business hours" };
  }
}

export async function addMenuCategory(data: {
  name: string;
  description?: string;
  image?: string;
}) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.restaurantId) {
      redirect("/auth/login");
    }

    await dbConnect();

    const existingCategory = await MenuCategory.findOne({
      restaurantId: session.restaurantId,
      name: data.name,
    });

    if (existingCategory) {
      return { error: "Category already exists" };
    }

    const category = await MenuCategory.create({
      ...data,
      restaurantId: session.restaurantId,
    });

    return { success: true, data: category };
  } catch (error) {
    console.error("Error adding menu category:", error);
    return { error: "Failed to add menu category" };
  }
}

export async function addMenuItem(data: {
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  preparationTime?: number;
  ingredients?: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
  };
}) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.restaurantId) {
      redirect("/auth/login");
    }

    await dbConnect();

    const existingItem = await MenuItem.findOne({
      restaurantId: session.restaurantId,
      name: data.name,
    });

    if (existingItem) {
      return { error: "Menu item already exists" };
    }

    const item = await MenuItem.create({
      ...data,
      restaurantId: session.restaurantId,
    });

    return { success: true, data: item };
  } catch (error) {
    console.error("Error adding menu item:", error);
    return { error: "Failed to add menu item" };
  }
}

export async function completeProfile() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.restaurantId) {
      redirect("/auth/login");
    }

    await dbConnect();

    // Check if all required fields are filled
    const restaurant = await Restaurant.findById(session.restaurantId);
    if (!restaurant) return { error: "Restaurant not found" };

    // Check if business hours are set
    if (!restaurant.businessHours || restaurant.businessHours.length === 0) {
      return { error: "Please set your business hours" };
    }

    // Check if at least one menu category exists
    const categoryCount = await MenuCategory.countDocuments({
      restaurantId: session.restaurantId,
    });
    if (categoryCount === 0) {
      return { error: "Please add at least one menu category" };
    }

    // Check if at least one menu item exists
    const menuItemCount = await MenuItem.countDocuments({
      restaurantId: session.restaurantId,
    });
    if (menuItemCount === 0) {
      return { error: "Please add at least one menu item" };
    }

    // Mark profile as complete
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      session.restaurantId,
      {
        $set: { isProfileComplete: true },
      },
      { new: true }
    );

    return { success: true, data: updatedRestaurant };
  } catch (error) {
    console.error("Error completing profile:", error);
    return { error: "Failed to complete profile" };
  }
}

export async function checkProfileCompletion() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.restaurantId) {
      redirect("/auth/login");
    }

    await dbConnect();
    const restaurant = await Restaurant.findById(session.restaurantId);
    if (!restaurant) {
      redirect("/auth/login");
    }

    const isComplete = Boolean(
      restaurant.name &&
        restaurant.cuisine?.length > 0 &&
        restaurant.settings?.currency &&
        restaurant.settings?.timezone &&
        restaurant.businessHours?.length > 0 &&
        restaurant.menu?.categories?.length > 0
    );

    if (!isComplete) {
      redirect("/setup");
    }

    return isComplete;
  } catch (error) {
    console.error("Profile completion check error:", error);
    redirect("/auth/login");
  }
}

export async function checkPermissions(requiredPermissions: string[]) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      redirect("/auth/login");
    }

    // For now, owners have all permissions
    if (session.role === "OWNER") {
      return true;
    }

    // TODO: Implement staff permission checks
    return false;
  } catch (error) {
    console.error("Permission check error:", error);
    redirect("/auth/login");
  }
}
