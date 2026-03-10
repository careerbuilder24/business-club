
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



export async function POST(req: NextRequest) {
  try {
    const {
      formData,
      logo_url,
      cover_url,
      gallery_urls,
      products,
      services,
    } = await req.json();

    /* ================= MYSQL ================= */
    const connection = await mysql.createConnection(dbConfig);

    const mysqlQuery = `
      INSERT INTO listings
      (
        listing_name,
        company_name,
        type,
        category,
        address,
        district,
        city,
        email,
        phone,
        website,
        facebook,
        description,
        labels,
        logo_url,
        cover_url,
        gallery_urls,
        products,
        services
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await connection.execute(mysqlQuery, [
      formData.listingName,
      formData.companyName,
      formData.type,
      formData.category,
      formData.address,
      formData.district,
      formData.city,
      formData.email,
      formData.phone,
      formData.website || null,
      formData.facebook || null,
      formData.description || null,
      JSON.stringify(formData.labels || []),
      logo_url,
      cover_url,
      JSON.stringify(gallery_urls || []),
      JSON.stringify(products || []),
      JSON.stringify(services || []),
    ]);

    await connection.end();

    /* ================= SUPABASE (DO NOT FAIL API) ================= */
    try {
      const { error } = await supabase.from("listings").insert([
        {
          listing_name: formData.listingName,
          company_name: formData.companyName,
          type: formData.type,
          category: formData.category,
          address: formData.address,
          district: formData.district,
          city: formData.city,
          email: formData.email,
          phone: formData.phone,
          website: formData.website || null,
          facebook: formData.facebook || null,
          description: formData.description || null,
          labels: formData.labels || [],
          logo_url,
          cover_url,
          gallery_urls,
          products,
          services,
        },
      ]);

      if (error) {
        console.error("SUPABASE INSERT ERROR (IGNORED):", error);
      }
    } catch (supabaseErr) {
      console.error("SUPABASE FETCH FAILED (IGNORED):", supabaseErr);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("POST LISTING ERROR:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

// PUT: update ONLY status / rejection_reason
export async function PUT(req: NextRequest) {
  try {
    const { id, status, reason } = await req.json();

    if (!id || !status) {
      return NextResponse.json({
        success: false,
        error: "ID and status are required",
      });
    }

    const connection = await mysql.createConnection(dbConfig);

    const updateQuery = `
      UPDATE listings
      SET status = ?, rejection_reason = ?
      WHERE id = ?
    `;
    await connection.execute(updateQuery, [status, reason || null, id]);
    await connection.end();

    const { error } = await supabase
      .from("listings")
      .update({ status, rejection_reason: reason || null })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT API ERROR:", err);
    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });
  }
}

// GET: list all
export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(`
      SELECT 
        id,
        listing_name,
        company_name,
        type,
        category,
        address,
        district,
        city,
        email,
        phone,
        website,
        facebook,
        description,
        labels,
        logo_url,
        cover_url,
        gallery_urls,
        products,
        services,
        status,
        rejection_reason,
        created_at
      FROM listings
      ORDER BY id DESC
    `);

    await connection.end();

    const parsedRows = (rows as any[]).map((item) => ({
      ...item,
      labels:
        typeof item.labels === "string"
          ? JSON.parse(item.labels)
          : item.labels || [],
      gallery_urls:
        typeof item.gallery_urls === "string"
          ? JSON.parse(item.gallery_urls)
          : item.gallery_urls || [],
      products:
        typeof item.products === "string"
          ? JSON.parse(item.products)
          : item.products || [],
      services:
        typeof item.services === "string"
          ? JSON.parse(item.services)
          : item.services || [],
    }));

    return NextResponse.json({ success: true, data: parsedRows });
  } catch (err) {
    console.error("GET API ERROR:", err);
    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });
  }
}

// PATCH: update editable fields from dashboard form
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "ID is required for update",
      });
    }

    const allowedFields = [
      "listing_name",
      "company_name",
      "type",
      "category",
      "address",
      "district",
      "city",
      "email",
      "phone",
      "website",
      "facebook",
      "description",
      "status",
      "labels",
      "logo_url",
      "cover_url",
      "gallery_urls",
      "products",
      "services",
    ];

    const updates: string[] = [];
    const values: any[] = [];

    for (const key of allowedFields) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);

        if (
          key === "labels" ||
          key === "gallery_urls" ||
          key === "products" ||
          key === "services"
        ) {
          values.push(JSON.stringify(fields[key] ?? []));
        } else {
          values.push(fields[key]);
        }
      }
    }

    if (updates.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No fields to update",
      });
    }

    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      `UPDATE listings SET ${updates.join(", ")} WHERE id = ?`,
      [...values, id]
    );
    await connection.end();

    const supabasePayload: any = {};
    for (const key of allowedFields) {
      if (fields[key] !== undefined) {
        if (
          key === "labels" ||
          key === "gallery_urls" ||
          key === "products" ||
          key === "services"
        ) {
          supabasePayload[key] = fields[key] ?? [];
        } else {
          supabasePayload[key] = fields[key];
        }
      }
    }

    const { error } = await supabase
      .from("listings")
      .update(supabasePayload)
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PATCH API ERROR:", err);
    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });
  }
}

// DELETE: delete listing
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "ID is required for delete",
      });
    }

    const connection = await mysql.createConnection(dbConfig);
    await connection.execute("DELETE FROM listings WHERE id = ?", [id]);
    await connection.end();

    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE API ERROR:", err);
    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });
  }
}
