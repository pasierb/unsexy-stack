import { SignupForm } from "@/components/auth/signup-form";
import { SocialAuth } from "@/components/auth/social-auth";
import { Link } from "@remix-run/react";

export default function Register() {
  return (
    <div className="flex flex-col space-y-4">
      <p className="prose">
        Sign up with your email address and password or sign in with social
      </p>

      <SocialAuth />

      <SignupForm />

      <p className="prose">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
