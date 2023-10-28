import { SignupForm } from "@/components/auth/signup-form";
import { Link } from "@remix-run/react";

export default function Register() {
  return (
    <div className="flex flex-col space-y-4">
      <SignupForm />

      <p className="prose">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
