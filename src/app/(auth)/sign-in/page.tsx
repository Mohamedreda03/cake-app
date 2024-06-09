"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Header from "@/components/auth/Header";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState, useTransition } from "react";
import { SignInFormTypes, SignInSchema } from "@/types/schema";
import signin from "@/actions/signin";

export default function Login() {
  const [isPanding, startTransition] = useTransition();
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<SignInFormTypes>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormTypes) => {
    startTransition(() => {
      signin(data);
      // .then((data: any) => {
      //   setErrorMessage(data?.error);
      //   setSuccessMessage(data?.success);
      //   console.log(data);
      // });
    });
  };

  return (
    <>
      <div
        dir="ltr"
        className="w-[500px] border border-gray-100 rounded-md shadow shadow-gray-200 p-11"
      >
        <Header
          title="Sign In"
          desc="login to your account."
          className="text-center"
        />
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPanding}
                          placeholder="e.g example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                        <Input
                          disabled={isPanding}
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Error and Success message */}
                {/* {errorMessage && <FormError message={errorMessage} />}
                {successMessage && <FormSuccess message={successMessage} />} */}
              </div>
              <Button disabled={isPanding} type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-full flex flex-row items-center justify-center gap-6 mb-6">
          <Separator className="w-[30%]" />
          or
          <Separator className="w-[30%]" />
        </div>

        <div>
          <Link
            href="/sign-up"
            className="text-muted-foreground text-sm underline text-center block w-full mt-5"
          >
            I don&apos;t have an account.
          </Link>
        </div>
      </div>
    </>
  );
}
