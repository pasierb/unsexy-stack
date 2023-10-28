import { PasswordLoginForm } from "@/components/auth/password-login-form";
import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";

export function SignIn() {
  return (
    <div className="flex flex-col space-y-4">
      <PasswordLoginForm />

      <p className="prose">
        Don't have account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}
