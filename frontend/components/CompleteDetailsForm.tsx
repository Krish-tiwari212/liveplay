"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from '@/context/UserContext';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Validation schema for form fields
const formSchema = z.object({
  contact_number: z.string().optional(),
  gender: z.string().optional(),
  date_of_birth: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  blood_group: z.string().optional(),
});

const CompleteDetailsForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const {user} = useUser();
  // console.log(user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact_number: "",
      gender: "",
      date_of_birth: "",
      city: "",
      pincode: "",
      blood_group: "",
    },
  });

  // Form submission for completing user details
  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log(user)
    // Assuming `user` is available in the scope
    const requestData = {
      ...data,
      user_id: user?.id,
    };
  
    const response = await fetch("/api/auth/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
  
    const result = await response.json();
    setLoading(false);
  
    if (response.ok) {
      toast({ title: "Details Updated", description: "Your details have been updated successfully!" });
      router.push("/");
    } else {
      toast({ title: "Update Failed", description: result.error || "An error occurred. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded">
        <h2 className="text-2xl font-bold text-center mb-6">
          Complete Your Details
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter your date of birth"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your pincode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blood_group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your blood group" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Updating..." : "Update Details"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CompleteDetailsForm;