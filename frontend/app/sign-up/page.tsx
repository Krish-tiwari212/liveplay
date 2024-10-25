"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Toast } from "@radix-ui/react-toast";
import Image from "next/image";

// Define the schema using zod
const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must match the Password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const ProfileForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {toast}=useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Submit handler
  const onSubmit = async (data: any) => {
    setLoading(true); // Start the loader

    // Simulate a delay for 2 seconds (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Store username and password in localStorage
    localStorage.setItem("username", data.username);
    localStorage.setItem("password", data.password);


    toast({
      title: "Successfull",
      variant: "default",
      description: "Successfully logged in!",
    });

    // Stop the loader
    setLoading(false);

    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#17202A] relative">
      {/* <Image 
        src="/images/login bg.jpg" 
        alt="logobg" 
        fill 
        className="w-full h-full absolute object-cover z-0" 
      /> */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md z-10">
        <h2 className="text-2xl font-bold text-center text-[#17202A]">
          Create Your Account
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 rounded-md focus:ring focus:ring-gray-300"
                      placeholder="username"
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
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 rounded-md focus:ring focus:ring-gray-300"
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
                  <FormLabel className="text-gray-700">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 rounded-md focus:ring focus:ring-gray-300"
                      type="password"
                      placeholder="confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription className="text-gray-500">
              Please fill to login
            </FormDescription>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#17202A] text-white hover:bg-gray-700"
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;
