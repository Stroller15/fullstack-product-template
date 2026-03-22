import { Router } from "express";
import { getAuth } from "@clerk/express";
import { prisma } from "@my-app/db";
import { CreateUserSchema, UpdateUserSchema } from "@my-app/validators";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { AppError } from "../middleware/error";

export const usersRouter = Router();

// GET /users/me — get current authenticated user
usersRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const { userId: clerkId } = getAuth(req);

    const user = await prisma.user.findUnique({ where: { clerkId: clerkId! } });
    if (!user) throw new AppError(404, "User not found");

    res.json({ data: user });
  } catch (err) {
    next(err);
  }
});

// POST /users — create a user (called from Clerk webhook or on first login)
usersRouter.post("/", validateBody(CreateUserSchema), async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) throw new AppError(401, "Unauthorized");

    const existing = await prisma.user.findUnique({ where: { clerkId } });
    if (existing) {
      res.status(200).json({ data: existing });
      return;
    }

    const user = await prisma.user.create({
      data: { clerkId, email, name },
    });

    res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
});

// PATCH /users/me — update current user
usersRouter.patch("/me", requireAuth, validateBody(UpdateUserSchema), async (req, res, next) => {
  try {
    const { userId: clerkId } = getAuth(req);
    const { name } = req.body;

    const user = await prisma.user.update({
      where: { clerkId: clerkId! },
      data: { name },
    });

    res.json({ data: user });
  } catch (err) {
    next(err);
  }
});
