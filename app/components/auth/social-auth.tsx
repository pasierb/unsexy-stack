import GoogleIcon from "@/icons/google";
// import {} from "@remix-run/react";
import { Button } from "@/components/ui/button";

export function SocialAuth() {
  return (
    <div>
      <Button asChild variant="outline">
        <a href="/auth/google">
          <GoogleIcon className="w-4 h-4" />
        </a>
      </Button>
    </div>
  );
}
