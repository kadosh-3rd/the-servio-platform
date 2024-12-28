import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export const menuCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  image: z.string().optional(),
  restaurantId: z.string(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export interface IMenuCategory extends Document {
  name: string;
  description?: string;
  image?: string;
  restaurantId: mongoose.Types.ObjectId;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const MenuCategorySchema = new Schema<IMenuCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    restaurantId: { 
      type: Schema.Types.ObjectId, 
      ref: "Restaurant",
      required: true 
    },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { 
    timestamps: true,
  }
);

// Ensure category names are unique per restaurant
MenuCategorySchema.index({ name: 1, restaurantId: 1 }, { unique: true });

export const MenuCategory = mongoose.models.MenuCategory || mongoose.model<IMenuCategory>("MenuCategory", MenuCategorySchema);
