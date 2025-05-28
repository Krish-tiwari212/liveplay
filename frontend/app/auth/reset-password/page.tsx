"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
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
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

// Validation schema for form fields
const formSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ChangePasswordPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: data.password }),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      toast({ title: "Password Changed", description: "Your password has been changed successfully!" });
      router.push("/auth/login");
    } else {
      toast({ title: "Change Failed", description: result.error || "An error occurred. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div
      className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-50"
      style={{
        backgroundImage: "url('/images/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image
        src="/images/Logo.png"
        alt="/images/Logo.png"
        width={350}
        height={350}
      />
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <Button variant="ghost" onClick={() => router.back()} className="float-left space-x-2 mb-4 -mt-2 -ml-2">
          <FaArrowLeft />
        </Button>
        <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl><Input type="password" placeholder="Enter your new password" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl><Input type="password" placeholder="Confirm your new password" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={loading} className="w-full">{loading ? "Changing..." : "Change Password"}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;