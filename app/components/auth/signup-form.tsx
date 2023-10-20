import { Form } from "@remix-run/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form as FormProvider,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>();

  return (
    <FormProvider {...form}>
      <Form reloadDocument method="POST" action="/auth/signup/password">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Sign up</Button>
      </Form>
    </FormProvider>
  );
}
