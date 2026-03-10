import { NextResponse } from "next/server";
import  db  from "@/lib/db"; // your DB connection

export async function POST(req: Request) {
  try {
    const { listingId } = await req.json();

    if (!listingId) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    // Increment view count
    await db.listing.update({
      where: { id: listingId },
      data: {
        view_count: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("View update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}