import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignIn } from "@/components/auth/sign-in";
import { siteName } from "@/config";

export function AuthDialog(props: PropsWithChildren<{}>) {
  return (
    <Dialog>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to {siteName}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <SignIn />
      </DialogContent>
    </Dialog>
  );
}
