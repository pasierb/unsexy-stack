import { useForm } from "react-hook-form";
import {
  Form as FormProvider,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, useNavigation } from "@remix-run/react";

export function PasswordLoginForm() {
  const navigation = useNavigation();
  const form = useForm<{ email: string; password: string }>({
    defaultValues: { email: "", password: "" },
  });

  return (
    <FormProvider {...form}>
      <form
        action={`/auth/login/password?goto=${navigation.location?.pathname}`}
        method="post"
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email" type="email" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </FormProvider>
  );
}
