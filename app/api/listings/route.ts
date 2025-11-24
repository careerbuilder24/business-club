
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { createClient } from "@supabase/supabase-js";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const IMGBB_API_KEY = process.env.IMGBB_KEY;

async function uploadToImgBB(file: File | null) {
  if (!file) return null;

  // Convert file to base64
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const formData = new FormData();
  formData.append("image", base64);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data?.data?.url || null;
}

// export async function POST(req: NextRequest) {
//   try {
//     const { formData, images } = await req.json();

//     // 1️⃣ Upload images to ImgBB
//     const logo_url = await uploadToImgBB(images.logo);
//     const cover_url = await uploadToImgBB(images.cover);
//     const gallery_urls: string[] = [];
//     if (images.gallery?.length > 0) {
//       for (let img of images.gallery) {
//         const url = await uploadToImgBB(img);
//         if (url) gallery_urls.push(url);
//       }
//     }

//     // 2️⃣ Insert into MySQL
//     const connection = await mysql.createConnection(dbConfig);
//     const mysqlQuery = `
//       INSERT INTO listings
//       (listing_name, company_name, category, address, email, phone, website, facebook, description, labels, logo_url, cover_url, gallery_urls)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     await connection.execute(mysqlQuery, [
//       formData.listingName,
//       formData.companyName,
//       formData.category,
//       formData.address,
//       formData.email,
//       formData.phone,
//       formData.website || null,
//       formData.facebook || null,
//       formData.description || null,
//       JSON.stringify(formData.labels || []),
//       logo_url,
//       cover_url,
//       JSON.stringify(gallery_urls),
//     ]);
//     await connection.end();

//     // 3️⃣ Insert into Supabase
//     const { error } = await supabase.from("listings").insert([
//       {
//         listing_name: formData.listingName,
//         company_name: formData.companyName,
//         category: formData.category,
//         address: formData.address,
//         email: formData.email,
//         phone: formData.phone,
//         website: formData.website || null,
//         facebook: formData.facebook || null,
//         description: formData.description || null,
//         labels: formData.labels || [],
//         logo_url,
//         cover_url,
//         gallery_urls,
//       },
//     ]);

//     if (error) throw error;

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, error: (err as Error).message });
//   }
// }
export async function POST(req: NextRequest) {
  try {
    const { formData, logo_url, cover_url, gallery_urls } = await req.json();

    //  Insert into MySQL
    const connection = await mysql.createConnection(dbConfig);
    const mysqlQuery = `
      INSERT INTO listings
      (listing_name, company_name, category, address, email, phone, website, facebook, description, labels, logo_url, cover_url, gallery_urls)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.execute(mysqlQuery, [
      formData.listingName,
      formData.companyName,
      formData.category,
      formData.address,
      formData.email,
      formData.phone,
      formData.website || null,
      formData.facebook || null,
      formData.description || null,
      JSON.stringify(formData.labels || []),
      logo_url,
      cover_url,
      JSON.stringify(gallery_urls),
    ]);
    await connection.end();

    // 3 Insert into Supabase
    const { error } = await supabase.from("listings").insert([
      {
        listing_name: formData.listingName,
        company_name: formData.companyName,
        category: formData.category,
        address: formData.address,
        email: formData.email,
        phone: formData.phone,
        website: formData.website || null,
        facebook: formData.facebook || null,
        description: formData.description || null,
        labels: formData.labels || [],
        logo_url,
        cover_url,
        gallery_urls,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
