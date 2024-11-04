"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    <div className="min-h-screen bg-white p-8 m-3 rounded-md">
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>

        <Separator />

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-800">Profile Information</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
        </Card>

        {/* Email Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-800">Email Settings</CardTitle>
            <CardDescription>Update your email address.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="email" type="email" placeholder="john.doe@example.com" className="pl-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-800">Change Password</CardTitle>
            <CardDescription>Ensure your account is using a secure password.</CardDescription>
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
        </Card>

        <div className="flex justify-end">
          <Button className="bg-gray-800 hover:bg-gray-700">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
