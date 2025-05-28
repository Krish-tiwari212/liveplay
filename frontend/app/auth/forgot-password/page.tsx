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
  email: z.string().email("Invalid email address"),
});

const ForgetPasswordForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    const response = await fetch("/api/auth/forget-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      toast({ title: "Email Sent", description: "A password reset link has been sent to your email!" });
    } else {
      toast({ title: "Request Failed", description: result.error || "An error occurred. Please try again.", variant: "destructive" });
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
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input placeholder="Enter your email" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={loading} className="w-full">{loading ? "Sending..." : "Send Reset Link"}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;