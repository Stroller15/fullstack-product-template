import type { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { env } from "../lib/env";

const secret = new TextEncoder().encode(env.NEXTAUTH_SECRET);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      auth?: {
        sub: string;
        email: string;
      };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const { payload } = await jwtVerify(token, secret);
    req.auth = {
      sub: payload.sub as string,
      email: payload.email as string,
    };
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}
