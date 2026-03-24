import { Router } from "express";
import { prisma } from "@my-app/db";
import { UpdateUserSchema } from "@my-app/validators";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { AppError } from "../middleware/error";

export const usersRouter = Router();

// GET /users/me — get current authenticated user (creates if not exists)
usersRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const { sub, email } = req.auth!;

    let user = await prisma.user.findUnique({ where: { providerId: sub } });

    if (!user) {
      user = await prisma.user.create({
        data: { providerId: sub, email },
      });
    }

    res.json({ data: user });
  } catch (err) {
    next(err);
  }
});

// PATCH /users/me — update current user
usersRouter.patch("/me", requireAuth, validateBody(UpdateUserSchema), async (req, res, next) => {
  try {
    const { sub } = req.auth!;
    const { name } = req.body;

    const user = await prisma.user.findUnique({ where: { providerId: sub } });
    if (!user) throw new AppError(404, "User not found");

    const updated = await prisma.user.update({
      where: { providerId: sub },
      data: { name },
    });

    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
});
