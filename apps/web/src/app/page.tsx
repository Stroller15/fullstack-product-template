import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <p className="text-xl font-bold">My App</p>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to My App</h1>
        <p className="mt-4 text-muted-foreground">Get started by editing this page.</p>
      </div>
    </main>
  );
}
