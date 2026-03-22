import { Queue, Worker, type Job } from "bullmq";
import { redis } from "./redis";

const connection = redis;

// --- Queue definitions ---
export const emailQueue = new Queue("email", { connection });

// --- Job data types ---
export interface EmailJobData {
  to: string;
  subject: string;
  body: string;
}

// --- Workers ---
export function startWorkers() {
  const emailWorker = new Worker<EmailJobData>(
    "email",
    async (job: Job<EmailJobData>) => {
      console.info(`Processing email job ${job.id} to ${job.data.to}`);
      // TODO: integrate email provider (e.g., Resend, SendGrid)
    },
    { connection },
  );

  emailWorker.on("failed", (job, err) => {
    console.error(`Email job ${job?.id} failed:`, err);
  });

  return { emailWorker };
}
