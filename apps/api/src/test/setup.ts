import { vi } from "vitest";

// Mock environment variables for tests
process.env["NODE_ENV"] = "test";
process.env["DATABASE_URL"] = "postgresql://test:test@localhost:5432/test";
process.env["DIRECT_URL"] = "postgresql://test:test@localhost:5432/test";
process.env["CLERK_SECRET_KEY"] = "sk_test_placeholder";
process.env["CLERK_PUBLISHABLE_KEY"] = "pk_test_placeholder";
process.env["REDIS_URL"] = "redis://localhost:6379";

// Mock Prisma
vi.mock("@my-app/db", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    $disconnect: vi.fn(),
  },
}));
