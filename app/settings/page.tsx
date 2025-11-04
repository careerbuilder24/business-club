// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { ArrowLeft, Bell, Lock, Eye, Trash2, Check } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Switch } from "@/components/ui/switch"

// export default function SettingsPage() {
//   const [notifications, setNotifications] = useState({
//     emailOnNewView: true,
//     emailOnMessage: true,
//     emailOnReview: true,
//     emailNewsletter: false,
//     smsNotifications: false,
//   })

//   const [privacy, setPrivacy] = useState({
//     profilePublic: true,
//     showEmail: false,
//     showPhone: false,
//     showListings: true,
//   })

//   const [saved, setSaved] = useState(false)

//   const handleNotificationChange = (key: string) => {
//     setNotifications({ ...notifications, [key]: !notifications[key] })
//     setSaved(false)
//   }

//   const handlePrivacyChange = (key: string) => {
//     setPrivacy({ ...privacy, [key]: !privacy[key] })
//     setSaved(false)
//   }

//   const handleSave = () => {
//     setSaved(true)
//     setTimeout(() => setSaved(false), 3000)
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-white border-b border-border">
//         <div className="container-custom py-6">
//           <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 w-fit">
//             <ArrowLeft size={20} />
//             <span>Back to Dashboard</span>
//           </Link>
//           <h1 className="text-3xl font-bold text-foreground">Settings</h1>
//           <p className="text-muted-foreground mt-2">Manage your account preferences and security</p>
//         </div>
//       </div>

//       <main className="container-custom py-8">
//         <div className="max-w-2xl space-y-6">
//           {/* Notification Preferences */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-center gap-3">
//                 <Bell className="text-primary" size={24} />
//                 <div>
//                   <CardTitle>Notification Preferences</CardTitle>
//                   <CardDescription>Choose how you want to be notified</CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">New Listing Views</p>
//                   <p className="text-sm text-muted-foreground">Get notified when someone views your listing</p>
//                 </div>
//                 <Switch
//                   checked={notifications.emailOnNewView}
//                   onCheckedChange={() => handleNotificationChange("emailOnNewView")}
//                 />
//               </div>

//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">New Messages</p>
//                   <p className="text-sm text-muted-foreground">Receive email alerts for new messages</p>
//                 </div>
//                 <Switch
//                   checked={notifications.emailOnMessage}
//                   onCheckedChange={() => handleNotificationChange("emailOnMessage")}
//                 />
//               </div>

//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">New Reviews</p>
//                   <p className="text-sm text-muted-foreground">Get notified when you receive a new review</p>
//                 </div>
//                 <Switch
//                   checked={notifications.emailOnReview}
//                   onCheckedChange={() => handleNotificationChange("emailOnReview")}
//                 />
//               </div>

//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">Newsletter</p>
//                   <p className="text-sm text-muted-foreground">Subscribe to our weekly business tips newsletter</p>
//                 </div>
//                 <Switch
//                   checked={notifications.emailNewsletter}
//                   onCheckedChange={() => handleNotificationChange("emailNewsletter")}
//                 />
//               </div>

//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">SMS Notifications</p>
//                   <p className="text-sm text-muted-foreground">Receive important updates via SMS</p>
//                 </div>
//                 <Switch
//                   checked={notifications.smsNotifications}
//                   onCheckedChange={() => handleNotificationChange("smsNotifications")}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Privacy Settings */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-center gap-3">
//                 <Eye className="text-primary" size={24} />
//                 <div>
//                   <CardTitle>Privacy Settings</CardTitle>
//                   <CardDescription>Control who can see your information</CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">Public Profile</p>
//                   <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
//                 </div>
//                 <Switch checked={privacy.profilePublic} onCheckedChange={() => handlePrivacyChange("profilePublic")} />
//               </div>

//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">Show Email Address</p>
//                   <p className="text-sm text-muted-foreground">Display your email on your profile</p>
//                 </div>
//                 <Switch checked={privacy.showEmail} onCheckedChange={() => handlePrivacyChange("showEmail")} />
//               </div>

//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">Show Phone Number</p>
//                   <p className="text-sm text-muted-foreground">Display your phone on your profile</p>
//                 </div>
//                 <Switch checked={privacy.showPhone} onCheckedChange={() => handlePrivacyChange("showPhone")} />
//               </div>

//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">Show Listings</p>
//                   <p className="text-sm text-muted-foreground">Display your listings publicly</p>
//                 </div>
//                 <Switch checked={privacy.showListings} onCheckedChange={() => handlePrivacyChange("showListings")} />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Security Settings */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-center gap-3">
//                 <Lock className="text-primary" size={24} />
//                 <div>
//                   <CardTitle>Security Settings</CardTitle>
//                   <CardDescription>Manage your account security</CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">Change Password</p>
//                   <p className="text-sm text-muted-foreground">Update your account password</p>
//                 </div>
//                 <Button variant="outline" size="sm">
//                   Change
//                 </Button>
//               </div>

//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">Two-Factor Authentication</p>
//                   <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
//                 </div>
//                 <Button variant="outline" size="sm">
//                   Enable
//                 </Button>
//               </div>

//               <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">Active Sessions</p>
//                   <p className="text-sm text-muted-foreground">Manage your logged-in devices</p>
//                 </div>
//                 <Button variant="outline" size="sm">
//                   View
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Danger Zone */}
//           <Card className="border-red-200 bg-red-50">
//             <CardHeader>
//               <div className="flex items-center gap-3">
//                 <Trash2 className="text-red-600" size={24} />
//                 <div>
//                   <CardTitle className="text-red-600">Danger Zone</CardTitle>
//                   <CardDescription>Irreversible actions</CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white hover:bg-red-50 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">Delete Account</p>
//                   <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
//                 </div>
//                 <Button variant="destructive" size="sm">
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Save Button */}
//           <div className="flex items-center justify-between pt-4">
//             <div>
//               {saved && (
//                 <div className="flex items-center gap-2 text-green-600 font-medium">
//                   <Check size={20} />
//                   Changes saved successfully
//                 </div>
//               )}
//             </div>
//             <Button onClick={handleSave} className="px-8">
//               Save Settings
//             </Button>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
