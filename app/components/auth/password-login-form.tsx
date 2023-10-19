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
import { Form } from "@remix-run/react";

export function PasswordLoginForm() {
  const form = useForm<{ username: string; password: string }>({
    defaultValues: { username: "", password: "" },
  });

  return (
    <FormProvider {...form}>
      <Form reloadDocument action="/auth/login/password" method="post">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
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

        <Button type="submit">Login with Password</Button>
      </Form>
    </FormProvider>
  );
}
