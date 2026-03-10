

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

/* ================= AUTH CHECK (JWT) ================= */
function requireAdmin(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) return false;

    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin") return false;

    return true;
  } catch (err) {
    return false;
  }
}

/* ========= CREATE BLOG ========= */
export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conn = await mysql.createConnection(dbConfig);

  try {
    const { category, sections, author_email } = await req.json();

    const [blogRes]: any = await conn.execute(
      `INSERT INTO blogs (category, author_email) VALUES (?, ?)`,
      [category, author_email]
    );

    for (const s of sections) {
      await conn.execute(
        `INSERT INTO blog_sections (blog_id, title, content, image_url)
         VALUES (?, ?, ?, ?)`,
        [blogRes.insertId, s.title, s.content, s.image_url || null]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  } finally {
    await conn.end();
  }
}

/* ========= GET BLOGS ========= */
export async function GET() {
  const conn = await mysql.createConnection(dbConfig);

  try {
    const [rows]: any = await conn.execute(`
      SELECT 
        b.id AS blog_id,
        b.category,
        b.status,
        b.author_email,
        b.created_at,
        s.id AS section_id,
        s.title,
        s.content,
        s.image_url
      FROM blogs b
      LEFT JOIN blog_sections s ON b.id = s.blog_id
      ORDER BY b.created_at DESC, s.id ASC
    `);

    const blogs: any[] = [];

    for (const r of rows) {
      let blog = blogs.find((b) => b.id === r.blog_id);

      if (!blog) {
        blog = {
          id: r.blog_id,
          category: r.category,
          status: r.status,
          author_email: r.author_email,
          created_at: r.created_at,
          sections: [],
        };
        blogs.push(blog);
      }

      if (r.section_id) {
        blog.sections.push({
          id: r.section_id,
          title: r.title,
          content: r.content,
          image_url: r.image_url,
        });
      }
    }

    return NextResponse.json({ success: true, blogs });
  } finally {
    await conn.end();
  }
}

/* ========= UPDATE BLOG ========= */
export async function PUT(req: NextRequest) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conn = await mysql.createConnection(dbConfig);

  try {
    const { blogId, category, sections } = await req.json();

    await conn.execute(`UPDATE blogs SET category=? WHERE id=?`, [
      category,
      blogId,
    ]);

    for (const s of sections) {
      await conn.execute(
        `UPDATE blog_sections
         SET title=?, content=?, image_url=?
         WHERE id=? AND blog_id=?`,
        [s.title, s.content, s.image_url || null, s.id, blogId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  } finally {
    await conn.end();
  }
}

/* ========= APPROVE / DENY BLOG ========= */
export async function PATCH(req: NextRequest) {
  if (!requireAdmin(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const conn = await mysql.createConnection(dbConfig);

  try {
    const { id, status } = await req.json();

    if (!id || !["active", "denied"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID or status" },
        { status: 400 }
      );
    }

    const [result]: any = await conn.execute(
      `UPDATE blogs SET status=? WHERE id=?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Blog ${status} successfully`,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  } finally {
    await conn.end();
  }
}