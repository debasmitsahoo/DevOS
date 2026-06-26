import Link from "next/link";
import { GithubIcon } from "@/components/icons/github";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <Card className="p-6">
      <h1 className="text-lg font-semibold">Create your passport</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        One click with GitHub and your passport auto-populates in ~30 seconds.
      </p>
      <div className="mt-5 space-y-2">
        <Button asChild className="w-full">
          <Link href="/dashboard">
            <GithubIcon className="size-4" /> Continue with GitHub
          </Link>
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}