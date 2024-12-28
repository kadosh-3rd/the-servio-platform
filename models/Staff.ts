import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export enum UserRole {
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  CHEF = "CHEF",
  WAITER = "WAITER",
  CASHIER = "CASHIER",
}

export const staffSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.nativeEnum(UserRole),
  phoneNumber: z.string().optional(),
  restaurantId: z.string(),
  isActive: z.boolean().default(true),
  lastLogin: z.date().optional(),
  permissions: z.array(z.string()).default([]),
});

export interface IStaff extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
  restaurantId: mongoose.Types.ObjectId;
  isActive: boolean;
  lastLogin?: Date;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const StaffSchema = new Schema<IStaff>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: Object.values(UserRole),
      required: true 
    },
    phoneNumber: { type: String },
    restaurantId: { 
      type: Schema.Types.ObjectId, 
      ref: "Restaurant",
      required: true 
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    permissions: [{ type: String }],
  },
  { 
    timestamps: true,
  }
);

// Ensure email is unique per restaurant
StaffSchema.index({ email: 1, restaurantId: 1 }, { unique: true });

export const Staff = mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema);
