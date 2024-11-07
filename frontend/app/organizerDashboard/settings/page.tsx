"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useEventContext } from "@/context/EventDataContext"
import { User, Mail, Lock, Save } from "lucide-react"
import { useEffect } from "react"

const SettingsPage = () => {
    const {setDashboardName}=useEventContext()
    useEffect(()=>{
        setDashboardName("Settings")
    },[])
  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 m-3 rounded-md">
      <div className="w-full space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gray-800">
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input id="firstName" placeholder="John" className="pl-8" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input id="lastName" placeholder="Doe" className="pl-8" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="ml-auto">
            <Button variant="default" size="sm">
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gray-800">Email Settings</CardTitle>
              <CardDescription>Update your email address.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className="pl-8"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Change Email
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-gray-800">Change Password</CardTitle>
              <CardDescription>
                Ensure your account is using a secure password.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="currentPassword" type="password" className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="newPassword" type="password" className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="confirmPassword" type="password" className="pl-8" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-row items-center justify-between">
            <Button variant="default" size="sm">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </CardFooter>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          {/* <Button className="bg-gray-800 hover:bg-gray-700">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage
