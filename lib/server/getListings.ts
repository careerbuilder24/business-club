
import mysql from "mysql2/promise";

/* ================= TYPES ================= */

interface ProductApi {
  name: string;
  images?: string[];
  description: string;
}

interface ServiceApi {
  name: string;
  images?: string[];
  description: string;
}

interface ListingRow {
  id: number;
  listing_name: string;
  company_name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  cover_url: string;
  category: string;
  rating: number;
  district: string;
  reviews: number;

  // 🔥 JSON columns
  products?: ProductApi[] | string;
  services?: ServiceApi[] | string;
}

/* ================= FUNCTION ================= */

export async function getListings() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  const [rows] = (await db.execute(
    "SELECT * FROM listings"
  )) as [ListingRow[], any];

  return rows.map((l) => {
    //  Parse JSON safely (MySQL may return string)
    const productsRaw =
      typeof l.products === "string"
        ? JSON.parse(l.products)
        : l.products ?? [];

    const servicesRaw =
      typeof l.services === "string"
        ? JSON.parse(l.services)
        : l.services ?? [];

    return {
      id: l.id,
      name: l.listing_name,
      companyName: l.company_name,
      description: l.description,
      address: l.address,
      phone: l.phone,
      email: l.email,
      website: l.website,
      logo: l.logo_url || "/placeholder.svg",
      coverImage: l.cover_url || "/default-cover.jpg",
      businessType: l.category,
      rating: Number(l.rating) || 4.5,
      district: l.district || "",
      reviews: l.reviews || 0,

      /* ================= PRODUCTS ================= */
      products: productsRaw.map((p: ProductApi, index: number) => ({
        id: String(index),
        name: p.name,
        image: p.images?.[0] || "/product-placeholder.jpg",
        description: p.description,
        rating: 4.5,
      })),

      /* ================= SERVICES ================= */
      services: servicesRaw.map((s: ServiceApi, index: number) => ({
        id: String(index),
        name: s.name,
        image: s.images?.[0] || "/service-placeholder.jpg",
        description: s.description,
        rating: 4.5,
      })),
    };
  });
}
