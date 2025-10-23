// // Static data for the application

// export interface Listing {
//   id: string
//   name: string
//   companyName: string
//   logo: string
//   coverImage: string
//   gallery: string[]
//   address: string
//   email: string
//   phone: string
//   website: string
//   facebook: string
//   category: string
//   labels: string[]
//   description: string
//   rating: number
//   reviews: number
// }

// export interface BlogPost {
//   id: string
//   title: string
//   author: string
//   date: string
//   image: string
//   content: string
//   comments: Comment[]
// }

// export interface Comment {
//   id: string
//   author: string
//   text: string
//   date: string
// }

// export const listings: Listing[] = [
//   {
//     id: "1",
//     name: "Tech Solutions Pro",
//     companyName: "Tech Solutions Inc.",
//     logo: "/tech-logo.jpg",
//     coverImage: "/tech-office.jpg",
//     gallery: ["/office-1.jpg", "/office-2.jpg", "/office-3.jpg"],
//     address: "123 Tech Street, San Francisco, CA 94105",
//     email: "contact@techsolutions.com",
//     phone: "+1 (555) 123-4567",
//     website: "https://techsolutions.com",
//     facebook: "https://facebook.com/techsolutions",
//     category: "Technology",
//     labels: ["Software Development", "Consulting", "Cloud Services"],
//     description:
//       "Leading technology solutions provider specializing in cloud infrastructure, software development, and IT consulting. We help businesses transform their digital operations.",
//     rating: 4.8,
//     reviews: 156,
//   },
//   {
//     id: "2",
//     name: "Creative Design Studio",
//     companyName: "Creative Design Co.",
//     logo: "/design-logo.jpg",
//     coverImage: "/design-studio.jpg",
//     gallery: ["/design-1.jpg", "/design-2.jpg", "/design-3.jpg"],
//     address: "456 Design Ave, New York, NY 10001",
//     email: "hello@creativedesign.com",
//     phone: "+1 (555) 234-5678",
//     website: "https://creativedesign.com",
//     facebook: "https://facebook.com/creativedesign",
//     category: "Design",
//     labels: ["Graphic Design", "UI/UX", "Branding"],
//     description:
//       "Award-winning design studio creating stunning visual identities and user experiences. We specialize in branding, graphic design, and digital experiences.",
//     rating: 4.9,
//     reviews: 203,
//   },
//   {
//     id: "3",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "4",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "5",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "6",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "7",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "8",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "9",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "10",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "11",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "12",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "13",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "14",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "15",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "16",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "17",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "18",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "19",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
//   {
//     id: "20",
//     name: "Digital Marketing Experts",
//     companyName: "Digital Marketing Pro",
//     logo: "/marketing-logo.jpg",
//     coverImage: "/marketing-office.jpg",
//     gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
//     address: "789 Marketing Blvd, Los Angeles, CA 90001",
//     email: "info@digitalmarketingpro.com",
//     phone: "+1 (555) 345-6789",
//     website: "https://digitalmarketingpro.com",
//     facebook: "https://facebook.com/digitalmarketingpro",
//     category: "Marketing",
//     labels: ["SEO", "Social Media", "Content Marketing"],
//     description:
//       "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
//     rating: 4.7,
//     reviews: 189,
//   },
// ]

// export const blogPosts: BlogPost[] = [
//   {
//     id: "1",
//     title: "The Future of Digital Marketing in 2025",
//     author: "Sarah Johnson",
//     date: "2025-01-15",
//     image: "/placeholder.svg?height=400&width=600",
//     content: "Explore the latest trends in digital marketing and how businesses can adapt to stay competitive in 2025.",
//     comments: [
//       {
//         id: "1",
//         author: "John Doe",
//         text: "Great insights! Very helpful for our strategy.",
//         date: "2025-01-16",
//       },
//     ],
//   },
//   {
//     id: "2",
//     title: "Building a Strong Brand Identity",
//     author: "Mike Chen",
//     date: "2025-01-10",
//     image: "/placeholder.svg?height=400&width=600",
//     content:
//       "Learn the essential steps to create a memorable and consistent brand identity that resonates with your audience.",
//     comments: [],
//   },
// ]

// export const categories = [
//   "Technology",
//   "Design",
//   "Marketing",
//   "Finance",
//   "Healthcare",
//   "Education",
//   "Retail",
//   "Food & Beverage",
// ]
// data.ts

/**
 * Interfaces for the directory listing data and blog content.
 */

export interface DivisionCategory {
  division: string;
  districts: string[];
}

export interface DivisionCategory {
  division: string;
  districts: string[];
}

/**
 * Interfaces for the directory listing data and blog content.
 * (Unchanged from your previous code)
 */
export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
  comments: Comment[];
}

export interface Listing {
  id: string;
  name: string;
  companyName: string;
  logo: string;
  coverImage: string;
  gallery: string[];
  address: string;
  email: string;
  phone: string;
  website: string;
  facebook: string;
  // NOTE: 'category' now represents the District of Bangladesh
  category: string;
  labels: string[];
  description: string;
  district: string;
  rating: number;
  reviews: number;
  businessType: string,
}

// --- Static Data ---

/**
 * The 64 Districts (Jela) of Bangladesh, grouped by 8 Divisions (Bivag).
 * This structure is ideal for showing in a nested or grouped dropdown/sidebar.
 */

export const businessCategories: string[] = [
  "Technology & Software",
  "Creative & Design",
  "Marketing & Advertising",
  "Finance & Legal",
  "Education & Training",
  "Health & Wellness",
  "Food & Beverage",
  "Real Estate & Construction",
];
export const categories: DivisionCategory[] = [
  {
    division: "Dhaka",
    districts: [
      "Dhaka",
      "Faridpur",
      "Gazipur",
      "Gopalganj",
      "Kishoreganj",
      "Madaripur",
      "Manikganj",
      "Munshiganj",
      "Narayanganj",
      "Narsingdi",
      "Rajbari",
      "Shariatpur",
      "Tangail",
    ],
  },
  {
    division: "Chattogram",
    districts: [
      "Bandarban",
      "Brahmanbaria",
      "Chandpur",
      "Chattogram",
      "Cumilla",
      "Cox's Bazar",
      "Feni",
      "Khagrachhari",
      "Lakshmipur",
      "Noakhali",
      "Rangamati",
    ],
  },
  {
    division: "Rajshahi",
    districts: [
      "Bogura",
      "Joypurhat",
      "Naogaon",
      "Natore",
      "Nawabganj",
      "Pabna",
      "Rajshahi",
      "Sirajganj",
    ],
  },
  {
    division: "Khulna",
    districts: [
      "Bagerhat",
      "Chuadanga",
      "Jashore",
      "Jhenaidah",
      "Khulna",
      "Kushtia",
      "Magura",
      "Meherpur",
      "Narail",
      "Satkhira",
    ],
  },
  {
    division: "Barishal",
    districts: [
      "Barguna",
      "Barishal",
      "Bhola",
      "Jhalokati",
      "Patuakhali",
      "Pirojpur",
    ],
  },
  {
    division: "Sylhet",
    districts: [
      "Habiganj",
      "Moulvibazar",
      "Sunamganj",
      "Sylhet",
    ],
  },
  {
    division: "Rangpur",
    districts: [
      "Dinajpur",
      "Gaibandha",
      "Kurigram",
      "Lalmonirhat",
      "Nilphamari",
      "Panchagarh",
      "Rangpur",
      "Thakurgaon",
    ],
  },
  {
    division: "Mymensingh",
    districts: [
      "Jamalpur",
      "Mymensingh",
      "Netrokona",
      "Sherpur",
    ],
  },
];

/**
 * Directory listings data (using District names in 'category' field).
 * (The rest of this array is largely unchanged, just truncated here for brevity)
 */

/**
 * Directory listings data, updated to use District names in the 'category' field.
 */
export const listings: Listing[] = [
  {
    id: "1",
    name: "Tech Solutions Pro",
    companyName: "Tech Solutions Inc.",
    logo: "/tech-logo.jpg",
    coverImage: "/tech-office.jpg",
    gallery: ["/office-1.jpg", "/office-2.jpg", "/office-3.jpg"],
    address: "123 Tech Street, San Francisco, CA 94105",
    email: "contact@techsolutions.com",
    phone: "+1 (555) 123-4567",
    website: "https://techsolutions.com",
    facebook: "https://facebook.com/techsolutions",
    // CHANGED: Using a District as the category
    category: "Dhaka",
    labels: ["Software Development", "Consulting", "Cloud Services"],
    description:
      "Leading technology solutions provider specializing in cloud infrastructure, software development, and IT consulting. We help businesses transform their digital operations.",
    rating: 4.8,
    district: "Dhaka",
    businessType: "Technology & Software",
    reviews: 156,
  },
  {
    id: "2",
    name: "Creative Design Studio",
    companyName: "Creative Design Co.",
    logo: "/design-logo.jpg",
    coverImage: "/design-studio.jpg",
    gallery: ["/design-1.jpg", "/design-2.jpg", "/design-3.jpg"],
    address: "456 Design Ave, New York, NY 10001",
    email: "hello@creativedesign.com",
    phone: "+1 (555) 234-5678",
    website: "https://creativedesign.com",
    facebook: "https://facebook.com/creativedesign",
    // CHANGED: Using a District as the category
    category: "Chattogram",
    labels: ["Graphic Design", "UI/UX", "Branding"],
    description:
      "Award-winning design studio creating stunning visual identities and user experiences. We specialize in branding, graphic design, and digital experiences.",
    rating: 4.9,
    district: "Khulna",
    businessType: "Technology & Software",
    reviews: 203,
  },
  {
    id: "3",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    phone: "+1 (555) 345-6789",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    businessType: "Technology & Software",
    // CHANGED: Using a District as the category
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    district: "Sylhet",
    reviews: 189,
  },
  // IDs 4-20 are left as duplicates of ID 3 but will also use 'Rajshahi' as the category
  {
    id: "4",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    phone: "+1 (555) 345-6789",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    businessType: "Technology & Software",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
     district: "Sylhet",
    reviews: 189,
  },
  {
    id: "5",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
     district: "Sylhet",
    reviews: 189,
  },
  {
    id: "6",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
     district: "Sylhet",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "7",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
     district: "Sylhet",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "8",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    phone: "+1 (555) 345-6789",
     district: "Sylhet",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    businessType: "Technology & Software",
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "9",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    phone: "+1 (555) 345-6789",
     district: "Sylhet",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    businessType: "Technology & Software",
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "10",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
     district: "Sylhet",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "11",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    businessType: "Technology & Software",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    phone: "+1 (555) 345-6789",
     district: "Sylhet",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "12",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
     district: "Sylhet",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "13",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
     district: "Sylhet",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "14",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
     district: "Sylhet",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "15",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    phone: "+1 (555) 345-6789",
    businessType: "Technology & Software",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
     district: "Sylhet",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "16",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
     district: "Sylhet",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "17",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
     district: "Sylhet",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "18",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    businessType: "Technology & Software",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    phone: "+1 (555) 345-6789",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
     district: "Sylhet",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "19",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
     district: "Sylhet",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "20",
    name: "Digital Marketing Experts",
    companyName: "Digital Marketing Pro",
    logo: "/marketing-logo.jpg",
    coverImage: "/marketing-office.jpg",
    gallery: ["/marketing-1.jpg", "/marketing-2.jpg", "/marketing-3.jpg"],
    address: "789 Marketing Blvd, Los Angeles, CA 90001",
    email: "info@digitalmarketingpro.com",
    businessType: "Technology & Software",
    phone: "+1 (555) 345-6789",
     district: "Sylhet",
    website: "https://digitalmarketingpro.com",
    facebook: "https://facebook.com/digitalmarketingpro",
    category: "Rajshahi",
    labels: ["SEO", "Social Media", "Content Marketing"],
    description:
      "Full-service digital marketing agency helping businesses grow online. Our expertise includes SEO, social media marketing, content strategy, and paid advertising.",
    rating: 4.7,
    reviews: 189,
  },
];

/**
 * Blog posts data (unchanged).
 */
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Digital Marketing in 2025",
    author: "Sarah Johnson",
    date: "2025-01-15",
    image: "/placeholder.svg?height=400&width=600",
    content: "Explore the latest trends in digital marketing and how businesses can adapt to stay competitive in 2025.",
    comments: [
      {
        id: "1",
        author: "John Doe",
        text: "Great insights! Very helpful for our strategy.",
        date: "2025-01-16",
      },
    ],
  },
  {
    id: "2",
    title: "Building a Strong Brand Identity",
    author: "Mike Chen",
    date: "2025-01-10",
    image: "/placeholder.svg?height=400&width=600",
    content:
      "Learn the essential steps to create a memorable and consistent brand identity that resonates with your audience.",
    comments: [],
  },
];