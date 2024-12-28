import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  restaurantId?: string;
  staffId?: string;
  role?: string;
}

export async function verifyJwtToken(token: string): Promise<JwtPayload> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export function generateJwtToken(payload: JwtPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d", // Token expires in 7 days
  });
}
