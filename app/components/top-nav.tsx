import { Link } from "@remix-run/react";
import { UserMenu } from "@/components/user-menu";
import { AuthDialog } from "@/components/auth/auth-dialog";
import type { SessionUser } from "@/session";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface TopNavProps {
  currentUser: SessionUser | null;
}

export function TopNav(props: TopNavProps) {
  const { currentUser } = props;

  return (
    <nav>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-end">
            <span className="text-2xl font-bold">Siteshooter</span>
          </Link>
        </div>

        <div>
          {currentUser !== null ? (
            <UserMenu currentUser={props.currentUser!}>
              <Button variant="ghost" size="icon">
                <PersonIcon />
              </Button>
            </UserMenu>
          ) : (
            <AuthDialog>Sign in</AuthDialog>
          )}
        </div>
      </div>
    </nav>
  );
}
