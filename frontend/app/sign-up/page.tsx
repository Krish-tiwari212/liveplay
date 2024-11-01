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

// Validation schema for form fields
const formSchema = z
  .object({
    full_name: z.string().min(2, { message: "Full Name is required" }),
    contact_number: z.string().min(10, { message: "Contact number must be valid" }),
    city: z.string().min(2, { message: "City is required" }),
    pincode: z.string().min(5, { message: "Pincode must be valid" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm Password must match Password" }),
    role: z.enum(["participant", "organizer"], { errorMap: () => ({ message: "Select a role" }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      contact_number: "",
      city: "",
      pincode: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "participant",
    },
  });

  // Form submission for email-based sign-up
  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      toast({ title: "Signup Successful", description: "Your account has been created!" });
      router.push("organizerDashboard");
    } else {
      toast({ title: "Signup Failed", description: result.error || "An error occurred. Please try again.", variant: "destructive" });
    }
  };

  // Navigate between steps
  const handleNextStep = async () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

  // Google OAuth signup
  const handleGoogleSignup = async () => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "google" }),
    });
    const result = await response.json();

    if (result.url) {
      window.location.href = result.url; // Redirect to Google OAuth
    } else {
      toast({ title: "Google Signup Failed", description: "Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50" key={step}>
      <div className="w-full max-w-lg p-8 bg-white rounded shadow-md">
        <div className="flex justify-between items-center mb-6">
          {step > 1 && (
            <button onClick={handlePreviousStep} className="text-gray-600">
              ← Back
            </button>
          )}
        </div>
        {step == 1 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
            <div className="w-full flex justify-center mb-5" >
              <Button onClick={handleGoogleSignup} className="w-full bg-white text-black border border-gray-300 flex items-center justify-center space-x-2 hover:bg-slate-200">
                <FaGoogle className="text-xl" />
                <span>Sign up with Google</span>
              </Button>
            </div>
          </>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                <FormField control={form.control} name="role" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you a participant or an organizer in events?</FormLabel>
                    <FormControl>
                      <select {...field} className="border p-2 rounded ml-2">
                        <option value="participant">Participant</option>
                        <option value="organizer">Organizer</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="full_name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="contact_number" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl><Input placeholder="Enter your contact number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input placeholder="Enter your city" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="pincode" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl><Input placeholder="Enter your pincode" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="button" onClick={handleNextStep} className="w-full">Next</Button>
              </>
            )}
            {step === 2 && (
              <>
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="Enter your email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" placeholder="Enter your password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl><Input type="password" placeholder="Confirm your password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="button" onClick={handleNextStep} className="w-full">Next</Button>
              </>
            )}
            {step === 3 && (
              <>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" {...form.register("terms")} />
                  <span className="text-sm text-gray-600">
                    I agree to the <Link href="#" className="text-blue-500">terms and conditions</Link>
                  </span>
                </div>
                <Button type="submit" disabled={loading} className="w-full">{loading ? "Signing up..." : "Sign Up"}</Button>
              </>
            )}
          </form>
        </Form>
        <Link href="/login" className="text-blue-500 text-center block mt-4">Already have an account? Login here</Link>
      </div>
    </div>
  );
};

export default SignUpForm;