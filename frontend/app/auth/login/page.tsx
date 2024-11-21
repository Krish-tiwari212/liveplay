"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import Script from "next/script";

// Define the schema for login validation
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    const token = (document.getElementById("cf-turnstile") as HTMLInputElement).value;

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, "cf-turnstile-response": token }),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      toast({
        title: "Login Successful",
        description: "You are now logged in!",
      });
      router.push("/");
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "google" }),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok && result.url) {
      window.location.href = result.url;
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "Google login failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-50"
      style={{
        backgroundImage: "url('/images/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <Image
        src="/images/Logo.png"
        alt="/images/Logo.png"
        width={300}
        height={300}
      />
      <div className="w-[90%] mx-auto sm:w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>
        <div className="w-full flex justify-center mb-2">
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-black border border-gray-300 flex items-center justify-center space-x-2 hover:bg-slate-200"
          >
            <Image
              src="/images/google.svg"
              alt="/images/google.svg"
              width="20"
              height="20"
              className="text-xl"
            />
            <span>{loading ? "Logging in..." : "Login with Google"}</span>
          </Button>
        </div>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
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
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="mr-2 border-3" />
                <label htmlFor="rememberMe" className="text-sm font-bold text-gray-600">
                  Remember Me
                </label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="cf-turnstile" data-sitekey="0x4AAAAAAA0kQ69J4ryUn-__"></div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-2">
          <Link href="/auth/sign-up" className="">
            Don't have an account? <span className="font-bold">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;