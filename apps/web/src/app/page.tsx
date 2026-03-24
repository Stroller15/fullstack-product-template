"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 flex w-full max-w-5xl items-center justify-between font-mono text-sm">
        <p className="text-xl font-bold">My App</p>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="text-sm">{session.user.name}</span>
              <button onClick={() => signOut()} className="text-sm underline">
                Sign out
              </button>
            </div>
          ) : (
            <button onClick={() => signIn("google")} className="text-sm underline">
              Sign in
            </button>
          )}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to My App</h1>
        <p className="text-muted-foreground mt-4">Get started by editing this page.</p>
      </div>
    </main>
  );
}
