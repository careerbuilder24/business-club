// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Check } from "lucide-react"
// import Checkout from "@/components/checkout"
// import { PRODUCTS } from "@/lib/products"

// export default function PackagesContent() {
//   const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
//   const [showCheckout, setShowCheckout] = useState(false)

//   const hostingPlans = PRODUCTS.filter((p) => p.id.includes("hosting"))
//   const otherPlans = PRODUCTS.filter((p) => !p.id.includes("hosting"))

//   const handleSelectPlan = (productId: string) => {
//     setSelectedPlan(productId)
//     setShowCheckout(true)
//   }

//   if (showCheckout && selectedPlan) {
//     return (
//       <div>
//         <Button variant="outline" onClick={() => setShowCheckout(false)} className="mb-6">
//           ← Back to Plans
//         </Button>
//         <Card>
//           <CardHeader>
//             <CardTitle>Complete Your Payment</CardTitle>
//             <CardDescription>Secure payment powered by Stripe</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Checkout productId={selectedPlan} />
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-foreground mb-2">Upgrade Your Plan</h1>
//         <p className="text-muted-foreground">Choose the perfect plan for your business needs</p>
//       </div>

//       {/* Hosting Plans Section */}
//       <div className="mb-12">
//         <h2 className="text-2xl font-bold text-foreground mb-6">Hosting Plans</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {hostingPlans.map((plan) => (
//             <Card
//               key={plan.id}
//               className={`relative flex flex-col transition-all ${selectedPlan === plan.id ? "ring-2 ring-primary" : ""}`}
//             >
//               {plan.id === "hosting-professional" && (
//                 <Badge className="absolute top-4 right-4 bg-primary text-white">Popular</Badge>
//               )}
//               <CardHeader>
//                 <CardTitle className="text-xl">{plan.name}</CardTitle>
//                 <CardDescription>{plan.description}</CardDescription>
//                 <div className="mt-4">
//                   <span className="text-4xl font-bold text-foreground">${(plan.priceInCents / 100).toFixed(2)}</span>
//                   <span className="text-muted-foreground ml-2">/month</span>
//                 </div>
//               </CardHeader>
//               <CardContent className="flex-1 flex flex-col">
//                 <ul className="space-y-3 mb-6 flex-1">
//                   {plan.features.map((feature, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <Check size={18} className="text-green-600 flex-shrink-0 mt-1" />
//                       <span className="text-sm text-foreground">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <Button
//                   className="w-full bg-[#2C8845] hover:bg-[#1f6230] text-white"
//                   onClick={() => handleSelectPlan(plan.id)}
//                 >
//                   Choose Plan
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Other Services Section */}
//       <div>
//         <h2 className="text-2xl font-bold text-foreground mb-6">Additional Services</h2>
//         {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {otherPlans.map((plan) => (
//             <Card key={plan.id}>
//               <CardHeader>
//                 <CardTitle className="text-lg">{plan.name}</CardTitle>
//                 <CardDescription>{plan.description}</CardDescription>
//                 <div className="mt-4">
//                   <span className="text-3xl font-bold text-foreground">${(plan.priceInCents / 100).toFixed(2)}</span>
//                 </div>
//               </CardHeader>
//               <CardContent className="flex flex-col">
//                 <ul className="space-y-2 mb-6 flex-1">
//                   {plan.features.slice(0, 3).map((feature, index) => (
//                     <li key={index} className="flex items-start gap-2">
//                       <Check size={16} className="text-green-600 flex-shrink-0 mt-1" />
//                       <span className="text-sm text-foreground">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <Button
//                   className="w-full bg-[#2C8845] hover:bg-[#1f6230] text-white"
//                   onClick={() => handleSelectPlan(plan.id)}
//                 >
//                   Purchase
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div> */}
//       </div>
//     </>
//   )
// }
