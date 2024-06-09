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
import { SignUpFormTypes, SignUpSchema } from "@/types/schema";
import { useState, useTransition } from "react";
import signup from "@/actions/signup";

export default function Login() {
  const [isPanding, startTransition] = useTransition();
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<SignUpFormTypes>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormTypes) => {
    startTransition(() => {
      signup(data);
      // .then((data: any) => {
      //   setErrorMessage(data?.error);
      //   setSuccessMessage(data?.success);
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
          title="Sign Up"
          desc="create a new account."
          className="text-center"
        />
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPanding}
                          placeholder="user name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPanding}
                          type="password"
                          placeholder="repite the password"
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
                Sign Up
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
            href="/sign-in"
            className="text-muted-foreground text-sm underline text-center block w-full mt-5"
          >
            I already have an account.
          </Link>
        </div>
      </div>
    </>
  );
}
