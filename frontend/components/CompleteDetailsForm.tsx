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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FaGoogle, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { useUser } from '@/context/UserContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Checkbox } from "./ui/checkbox";

// Validation schema for form fields
const formSchema = z.object({
  contact_number: z.string().optional(),
  gender: z.string().optional(),
  date_of_birth: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  blood_group: z.string().optional(),
  terms_and_condition:z.boolean()
});

const CompleteDetailsForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [under18, setUnder18] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact_number: "",
      gender: "",
      date_of_birth: "",
      city: "",
      pincode: "",
      blood_group: "",
      terms_and_condition:false
    },
  });

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const onSubmit = async (data: any) => {
    if (!otpVerified) {
      toast({ title: "OTP Verification Required", description: "Please verify the OTP before submitting the form.", variant: "destructive" });
      return;
    }

    setLoading(true);
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

  const handleSendOtp = async () => {
    const contactNumber = form.getValues("contact_number");
    if (!contactNumber) {
      toast({ title: "Contact Number Required", description: "Please enter your contact number to receive the OTP.", variant: "destructive" });
      return;
    }

    const response = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact_number: contactNumber, user_id: user?.id }),
    });

    const result = await response.json();

    if (response.ok) {
      toast({ title: "OTP Sent", description: "An OTP has been sent to your contact number." });
      setOtpVisible(true);
    } else {
      toast({ title: "OTP Sending Failed", description: result.error || "An error occurred. Please try again.", variant: "destructive" });
    }
  };

  const handleVerifyOtp = async () => {
    const contactNumber = form.getValues("contact_number");

    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact_number: contactNumber, otp: otpValue, user_id: user?.id }),
    });

    const result = await response.json();

    if (response.ok) {
      setOtpVerified(true);
      toast({ title: "OTP Verified", description: "Your OTP has been verified successfully!" });
      setOtpVisible(false);
    } else {
      toast({ title: "Invalid OTP", description: result.error || "The OTP you entered is incorrect. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div
      className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-50"
      // style={{
      //   backgroundImage: "url('/images/background.svg')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      {/* <Image
        src="/images/Logo.png"
        alt="/images/Logo.png"
        width={300}
        height={300}
      /> */}
      <div className="w-[90%] mx-auto sm:w-full max-w-lg p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Complete Your Details
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              const age = calculateAge(data.date_of_birth);
              if (age < 18) {
                setUnder18(true);
              } else {
                onSubmit(data);
              }
            })}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Whatsapp Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter your whatsapp number"
                        {...field}
                      />
                      <Button type="button" onClick={handleSendOtp}>
                        <FaWhatsapp />
                        Verify
                      </Button>
                    </div>
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
                  <FormLabel>
                    Gender <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your gender" {...field} />
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
                  <FormLabel>
                    Date of Birth <span className="text-red-500">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    City <span className="text-red-500">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    Pincode <span className="text-red-500">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    Blood Group <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your blood group" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms_and_condition"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <Link href="/policies/termsandcondition">
                      <FormLabel className="hover:underline hover:text-blue-400 cursor-pointer ">
                        Terms And Conditions
                      </FormLabel>
                    </Link>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading || !otpVerified}
              className="w-full"
            >
              {loading ? "Updating..." : "Update Details"}
            </Button>
          </form>
        </Form>
      </div>

      <Dialog open={otpVisible} onOpenChange={setOtpVisible}>
        <DialogContent className="sm:max-w-[425px] h-[15rem]">
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
            <DialogDescription>
              Enter the OTP sent to your whatsapp number.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={(value) => setOtpValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={under18} onOpenChange={setUnder18}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Under 18 Confirmation</DialogTitle>
            <DialogDescription>
              You are under 18. Please confirm to proceed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setUnder18(false);
                form.handleSubmit(onSubmit)();
              }}
            >
              Confirm
            </Button>
            <Button variant="secondary" onClick={() => setUnder18(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompleteDetailsForm;