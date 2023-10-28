import GoogleIcon from "@/icons/google";
import { Button } from "@/components/ui/button";

const socialProviders = [{ href: "/auth/google", Icon: GoogleIcon }];

export function SocialAuth() {
  return (
    <div className="flex gap-4">
      {socialProviders.map(({ href, Icon }) => (
        <Button asChild variant="outline">
          <a href={href} className="grow">
            <Icon className="w-4 h-4" />
          </a>
        </Button>
      ))}
    </div>
  );
}
