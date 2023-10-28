import { PasswordLoginForm } from "@/components/auth/password-login-form";
import { Link } from "@remix-run/react";
import { SocialAuth } from "@/components/auth/social-auth";

export function SignIn() {
  return (
    <div className="flex flex-col space-y-4">
      <p className="prose">
        Sign in with your email address and password or sign in with social
      </p>

      <SocialAuth />

      <PasswordLoginForm />

      <p className="prose">
        Don't have account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}
