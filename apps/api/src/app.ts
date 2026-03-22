import express from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import * as Sentry from "@sentry/node";
import { clerkAuth } from "./middleware/auth";
import { errorHandler, notFoundHandler } from "./middleware/error";
import { router } from "./routes";
import { env } from "./lib/env";

Sentry.init({
  dsn: env.SENTRY_DSN,
  environment: env.NODE_ENV,
  tracesSampleRate: env.NODE_ENV === "production" ? 0.1 : 1.0,
});

export function createApp() {
  const app = express();

  // Security
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Clerk auth (verifies JWT and attaches auth to req)
  app.use(clerkAuth);

  // Routes
  app.use("/api/v1", router);

  // 404
  app.use(notFoundHandler);

  // Central error handler (must be last)
  app.use(errorHandler);

  return app;
}
