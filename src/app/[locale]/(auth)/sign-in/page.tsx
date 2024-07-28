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
import { Link, useRouter } from "@/hooks/navigation";
import { useState, useTransition } from "react";
import { SignInFormTypes, SignInSchema } from "@/types/schema";
import signin from "@/actions/signin";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Login() {
  const [isPanding, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const t = useTranslations("Sign_Page");
  const { data: session, update } = useSession();
  const router = useRouter();
  // const rout = Router();

  if (session?.user) {
    router.push("/");
  }

  const form = useForm<SignInFormTypes>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormTypes) => {
    startTransition(async () => {
      await signin(data).then((data: any) => {
        setErrorMessage(data?.error);
        if (data?.success) {
          window.location.href = "/";
        }
      });
    });
  };

  return (
    <>
      <div className="w-[500px] border border-gray-100 rounded-md shadow shadow-gray-200 p-11 bg-white">
        <Header title={t("sign_in")} desc="" className="text-center" />
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-3">
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
                {t("sign_in")}
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
            {t("dont_have_account")}
          </Link>
        </div>
      </div>
    </>
  );
}
