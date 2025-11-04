export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: "hosting-starter",
    name: "Starter Hosting Plan",
    description: "Perfect for getting started with your business listing",
    priceInCents: 999, // $9.99/month
    features: ["1 Business Listing", "5GB Storage", "Basic Analytics", "Email Support", "Featured Badge"],
  },
  {
    id: "hosting-professional",
    name: "Professional Hosting Plan",
    description: "For growing businesses needing more features",
    priceInCents: 2999, // $29.99/month
    features: [
      "5 Business Listings",
      "50GB Storage",
      "Advanced Analytics",
      "Priority Email Support",
      "Featured Badge",
      "Custom Domain",
      "Social Media Integration",
    ],
  },
  {
    id: "hosting-enterprise",
    name: "Enterprise Hosting Plan",
    description: "Full-featured plan for established businesses",
    priceInCents: 9999, // $99.99/month
    features: [
      "Unlimited Business Listings",
      "Unlimited Storage",
      "Premium Analytics & Reports",
      "24/7 Phone Support",
      "Featured Badge",
      "Custom Domain",
      "Social Media Integration",
      "API Access",
      "Dedicated Account Manager",
    ],
  },
  {
    id: "domain-plan",
    name: "Domain Registration Plan",
    description: "Add a custom domain to your listing",
    priceInCents: 1299, // $12.99/year
    features: ["Custom Domain (.com, .net, etc)", "Domain Privacy", "DNS Management", "1 Year Registration"],
  },
  {
    id: "ecommerce-plan",
    name: "E-Commerce Website Plan",
    description: "Complete e-commerce solution for your business",
    priceInCents: 4999, // $49.99/month
    features: [
      "Fully Hosted E-Commerce Site",
      "Product Catalog (up to 100 products)",
      "Shopping Cart & Checkout",
      "Payment Gateway Integration",
      "50GB Storage",
      "SSL Certificate",
      "Order Management",
      "Inventory Tracking",
    ],
  },
]
