import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // optional Supabase client
import db from "@/lib/db"; // Workbranch/MySQL client

export async function GET() {
  try {
    // --- Fetch from Supabase if URL & KEY exist ---
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      const { data: users, error } = await supabase.from("users").select("*");

      if (error) {
        console.error("Supabase fetch error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
      }

      return NextResponse.json({ users, source: "Supabase" }, { status: 200 });
    }

    // --- Fallback to Workbranch/MySQL ---
    const [rows] = await db.query("SELECT * FROM users");
    return NextResponse.json({ users: rows, source: "MySQL" }, { status: 200 });
  } catch (error) {
    console.error("GET users error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const { id, role } = await req.json();

    if (!id || !role) {
      return NextResponse.json(
        { message: "id and role are required" },
        { status: 400 }
      );
    }

    let result, error;

    // Correct env keys
    const useSupabase =
      process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (useSupabase) {
      const { data, error: supaError } = await supabase
        .from("users")
        .update({ role })
        .eq("id", id)
        .select();

      result = data;
      error = supaError;
    } else {
      const [rows]: any = await db.query(
        "UPDATE users SET role = ? WHERE id = ?",
        [role, id]
      );
      result = rows;
    }

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { message: "Failed to update role" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Role updated successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT users error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


/* ==========================
   DELETE USER (NO folder id)
========================== */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // <-- id comes from body

    if (!id) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 }
      );
    }

    let result, error;

    // Supabase delete
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      const { data, error: supaError } = await supabase
        .from("users")
        .delete()
        .eq("id", id)
        .select();

      result = data;
      error = supaError;
    } 
    // MySQL delete
    else {
      const [rows]: any = await db.query(
        "DELETE FROM users WHERE id = ?",
        [id]
      );
      result = rows;
    }

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "User deleted successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE users error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
