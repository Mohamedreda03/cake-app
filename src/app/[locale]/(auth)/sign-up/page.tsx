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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isPanding, startTransition] = useTransition();
  const t = useTranslations("Sign_Page");
  const session = useSession();
  const router = useRouter();

  if (session.data?.user) {
    router.push("/");
  }

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
      signup(data).then((data: any) => {
        setErrorMessage(data?.error);
      });
    });
  };

  return (
    <>
      <div className="w-[500px] border border-gray-100 rounded-md shadow shadow-gray-200 p-11 bg-white">
        <Header title={t("sign_up")} desc="" className="text-center" />
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user_name")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPanding}
                          placeholder={t("user_name")}
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
                      <FormLabel>{t("email")}</FormLabel>
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
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPanding}
                          type="password"
                          placeholder={t("password")}
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
                      <FormLabel>{t("confirm_Password")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPanding}
                          type="password"
                          placeholder={t("repite_the_password")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Error and Success message */}
                {errorMessage && (
                  <div className="flex items-center justify-center bg-red-50 border border-red-200 py-2 rounded-md">
                    <p className="text-red-500">{errorMessage}</p>
                  </div>
                )}
                {/* {successMessage && <FormSuccess message={successMessage} />} */}
              </div>
              <Button
                variant="main"
                disabled={isPanding}
                type="submit"
                className="w-full"
              >
                {t("sign_up")}
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
            {t("have_account")}
          </Link>
        </div>
      </div>
    </>
  );
}
