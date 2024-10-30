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

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      toast({
        title: "Login Successful",
        description: "You are now logged in!",
      });
      router.push("/dashboard");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        <div className="w-full flex justify-center mb-5" >
          <Button onClick={handleGoogleLogin} disabled={loading} className="w-full bg-white text-black border border-gray-300 flex items-center justify-center space-x-2 hover:bg-slate-200">
            <FaGoogle className="text-xl" />
            <span>{loading ? "Logging in..." : "Login with Google"}</span>
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        {/* <Button onClick={handleGoogleLogin} disabled={loading} className="w-full mt-4">
          {loading ? "Logging in..." : "Login with Google"}
        </Button> */}
        <div className="text-center mt-4">
          <Link href="/sign-up" className="">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;