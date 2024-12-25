import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import * as z from "zod";

export const registerSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  ownerName: z.string().min(2, {
    message: "Owner's name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().min(5, {
    message: "Please enter a valid address.",
  }),
  licenseNumber: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const signToken = (payload: { restaurantId: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { restaurantId: string };
  } catch (error) {
    return null;
  }
};

export const getAuthToken = (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.split(" ")[1];
};

export const isAuthenticated = async (req: NextRequest) => {
  const token = getAuthToken(req);
  if (!token) return null;

  return verifyToken(token);
};
