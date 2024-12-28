import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const restaurantSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string(),
  address: z.string(),
  licenseNumber: z.string().optional(),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  businessHours: z.array(z.object({
    day: z.number().min(0).max(6),
    open: z.string(),
    close: z.string(),
    isClosed: z.boolean().default(false),
  })).optional(),
  cuisine: z.array(z.string()).optional(),
  isProfileComplete: z.boolean().default(false),
  settings: z.object({
    currency: z.string().default("USD"),
    timezone: z.string().default("UTC"),
    taxRate: z.number().default(0),
    serviceCharge: z.number().default(0),
    allowReservations: z.boolean().default(true),
    requirePayment: z.boolean().default(false),
    autoAcceptOrders: z.boolean().default(true),
  }).optional(),
  socialMedia: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    website: z.string().optional(),
  }).optional(),
});

export interface IRestaurant extends Document {
  businessName: string;
  ownerName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  licenseNumber?: string;
  logo?: string;
  coverImage?: string;
  businessHours?: {
    day: number;
    open: string;
    close: string;
    isClosed: boolean;
  }[];
  cuisine?: string[];
  isProfileComplete: boolean;
  settings?: {
    currency: string;
    timezone: string;
    taxRate: number;
    serviceCharge: number;
    allowReservations: boolean;
    requirePayment: boolean;
    autoAcceptOrders: boolean;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const RestaurantSchema = new Schema<IRestaurant>(
  {
    businessName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    licenseNumber: { type: String },
    logo: { type: String },
    coverImage: { type: String },
    businessHours: [{
      day: { type: Number, min: 0, max: 6 },
      open: String,
      close: String,
      isClosed: { type: Boolean, default: false },
    }],
    cuisine: [{ type: String }],
    isProfileComplete: { type: Boolean, default: false },
    settings: {
      currency: { type: String, default: "USD" },
      timezone: { type: String, default: "UTC" },
      taxRate: { type: Number, default: 0 },
      serviceCharge: { type: Number, default: 0 },
      allowReservations: { type: Boolean, default: true },
      requirePayment: { type: Boolean, default: false },
      autoAcceptOrders: { type: Boolean, default: true },
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
      website: String,
    },
  },
  { 
    timestamps: true,
  }
);

// Hash password before saving
RestaurantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
RestaurantSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

export const Restaurant = mongoose.models.Restaurant || mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
