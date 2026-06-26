import Link from "next/link";
import { GithubIcon } from "@/components/icons/github";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <Card className="p-6">
      <h1 className="text-lg font-semibold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Keyless dev build — auth is mocked. Clerk slots in here once configured.
      </p>
      <div className="mt-5 space-y-2">
        <Button asChild className="w-full">
          <Link href="/dashboard">
            <GithubIcon className="size-4" /> Continue with GitHub
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/dashboard">Continue to demo dashboard</Link>
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        New here?{" "}
        <Link href="/sign-up" className="text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </Card>
  );
}