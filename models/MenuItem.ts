import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export const menuItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  category: z.string(),
  image: z.string().optional(),
  restaurantId: z.string(),
  isAvailable: z.boolean().default(true),
  preparationTime: z.number().min(0).optional(), // in minutes
  ingredients: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
  nutritionalInfo: z.object({
    calories: z.number().optional(),
    protein: z.number().optional(),
    carbs: z.number().optional(),
    fats: z.number().optional(),
  }).optional(),
});

export interface IMenuItem extends Document {
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  restaurantId: mongoose.Types.ObjectId;
  isAvailable: boolean;
  preparationTime?: number;
  ingredients?: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    restaurantId: { 
      type: Schema.Types.ObjectId, 
      ref: "Restaurant",
      required: true 
    },
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: Number },
    ingredients: [{ type: String }],
    allergens: [{ type: String }],
    nutritionalInfo: {
      calories: { type: Number },
      protein: { type: Number },
      carbs: { type: Number },
      fats: { type: Number },
    },
  },
  { 
    timestamps: true,
  }
);

// Ensure menu item names are unique per restaurant
MenuItemSchema.index({ name: 1, restaurantId: 1 }, { unique: true });

export const MenuItem = mongoose.models.MenuItem || mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
