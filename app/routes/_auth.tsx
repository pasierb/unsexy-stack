import { Outlet, useSearchParams } from "@remix-run/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ErrorAlert() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Invalid credentials</AlertTitle>
      <AlertDescription>Email or password invalid</AlertDescription>
    </Alert>
  );
}

export default function AuthRoot() {
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("error");

  return (
    <div>
      {errorCode && <ErrorAlert />}
      <Outlet />
    </div>
  );
}
