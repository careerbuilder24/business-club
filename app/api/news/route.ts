
// import { NextRequest, NextResponse } from "next/server";
// import mysql from "mysql2/promise";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs";

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// };

// /* ========= CREATE NEWS (FORMDATA) ========= */
// export async function POST(req: NextRequest) {
//   const conn = await mysql.createConnection(dbConfig);

//   try {
//     const formData = await req.formData();

//     const title = formData.get("title") as string;
//     const content = formData.get("content") as string;
//     const youtubeLink = formData.get("youtubeLink") as string;
//     const breakingNews = formData.get("breakingNews") as string;
//     const image = formData.get("image") as File | null;

//     if (!title || !content || !image) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // ===== SAVE IMAGE =====
//     const buffer = Buffer.from(await image.arrayBuffer());

//     const uploadDir = path.join(process.cwd(), "public/uploads");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const fileName = `${Date.now()}-${image.name}`;
//     fs.writeFileSync(path.join(uploadDir, fileName), buffer);

//     const imageUrl = `/uploads/${fileName}`;

//     // ===== INSERT DB =====
//     await conn.execute(
//       `INSERT INTO news 
//        (title, content, image_url, youtube_link, breaking_news)
//        VALUES (?, ?, ?, ?, ?)`,
//       [
//         title,
//         content,
//         imageUrl,
//         youtubeLink || null,
//         breakingNews || null,
//       ]
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("NEWS CREATE ERROR:", err);
//     return NextResponse.json(
//       { success: false, error: "Server error" },
//       { status: 500 }
//     );
//   } finally {
//     await conn.end();
//   }
// }

// /* ========= FETCH NEWS ========= */
// export async function GET() {
//   const conn = await mysql.createConnection(dbConfig);

//   try {
//     const [rows]: any = await conn.execute(
//       `SELECT * FROM news ORDER BY created_at DESC`
//     );

//     return NextResponse.json({ success: true, news: rows });
//   } finally {
//     await conn.end();
//   }
// }
// import { NextRequest, NextResponse } from "next/server";
// import mysql from "mysql2/promise";

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// };

// /* ========= CREATE NEWS ========= */
// export async function POST(req: NextRequest) {
//   const conn = await mysql.createConnection(dbConfig);

//   try {
//     const {
//       title,
//       content,
//       image_url,
//       youtubeLink,
//       breakingNews,
//     } = await req.json();

//     if (!title || !content || !image_url) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     await conn.execute(
//       `INSERT INTO news 
//        (title, content, image_url, youtube_link, breaking_news)
//        VALUES (?, ?, ?, ?, ?)`,
//       [
//         title,
//         content,
//         image_url,
//         youtubeLink || null,
//         breakingNews || null,
//       ]
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("NEWS CREATE ERROR:", err);
//     return NextResponse.json(
//       { success: false, error: "Server error" },
//       { status: 500 }
//     );
//   } finally {
//     await conn.end();
//   }
// }

// /* ========= FETCH NEWS ========= */
// export async function GET() {
//   const conn = await mysql.createConnection(dbConfig);

//   try {
//     const [rows]: any = await conn.execute(
//       `SELECT * FROM news ORDER BY created_at DESC`
//     );

//     return NextResponse.json({ success: true, news: rows });
//   } finally {
//     await conn.end();
//   }
// }
// import { NextRequest, NextResponse } from "next/server";
// import mysql from "mysql2/promise";

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// };

// /* ========= CREATE NEWS ========= */
// export async function POST(req: NextRequest) {
//   const conn = await mysql.createConnection(dbConfig);

//   let bodyText = "";
//   let body: any;

//   try {
//     bodyText = await req.text();        // 👈 RAW BODY
//     body = JSON.parse(bodyText);        // 👈 SAFE PARSE
//   } catch (err) {
//     console.error("RAW BODY:", bodyText);
//     return NextResponse.json(
//       { success: false, error: "Invalid JSON payload" },
//       { status: 400 }
//     );
//   }

//   try {
//     const {
//       title,
//       content,
//       image_url,
//       youtubeLink,
//       breakingNews,
//     } = body;

//     if (!title || !content || !image_url) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     await conn.execute(
//       `INSERT INTO news
//        (title, content, image_url, youtube_link, breaking_news)
//        VALUES (?, ?, ?, ?, ?)`,
//       [
//         title,
//         content,
//         image_url,
//         youtubeLink || null,
//         breakingNews || null,
//       ]
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("NEWS CREATE ERROR:", err);
//     return NextResponse.json(
//       { success: false, error: "Server error" },
//       { status: 500 }
//     );
//   } finally {
//     await conn.end();
//   }
// }

// /* ========= FETCH NEWS ========= */
// export async function GET() {
//   const conn = await mysql.createConnection(dbConfig);

//   try {
//     const [rows]: any = await conn.execute(
//       `SELECT * FROM news ORDER BY created_at DESC`
//     );

//     return NextResponse.json({ success: true, news: rows });
//   } finally {
//     await conn.end();
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

/* ========= CREATE NEWS ========= */
export async function POST(req: NextRequest) {
  const conn = await mysql.createConnection(dbConfig);

  let bodyText = "";
  let body: any;

  try {
    bodyText = await req.text();
    body = JSON.parse(bodyText);
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  try {
   

    const {
      title,
      category,
      content,
      image_url,
      youtubeLink,
      breakingNews,
      blog_writer_email,  
    } = body;


  

    if (
      !title ||
      !content ||
      !image_url ||
      !blog_writer_email ||
      !["national", "international"].includes(category)
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }



    await conn.execute(
      `INSERT INTO news
   (title, category, blog_writer_email, content, image_url, youtube_link, breaking_news)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        category,
        blog_writer_email, //  NOW INCLUDED
        content,
        image_url,
        youtubeLink || null,
        breakingNews || null,
      ]
    );


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("NEWS CREATE ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  } finally {
    await conn.end();
  }
}

/* ========= FETCH NEWS ========= */

export async function GET(req: NextRequest) {
  const conn = await mysql.createConnection(dbConfig);

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    /* ========= SINGLE NEWS ========= */
    if (id) {
      const [rows]: any = await conn.execute(
        `SELECT * FROM news WHERE id = ?`,
        [id]
      );

      if (rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "News not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, news: rows[0] });
    }

    /* ========= ALL NEWS ========= */
    const [rows]: any = await conn.execute(
      `SELECT * FROM news ORDER BY created_at DESC`
    );

    return NextResponse.json({ success: true, news: rows });

  } finally {
    await conn.end();
  }
}


/* ========= UPDATE STATUS ========= */
export async function PATCH(req: NextRequest) {
  const conn = await mysql.createConnection(dbConfig);

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid id or status" },
        { status: 400 }
      );
    }

    await conn.execute(
      `UPDATE news SET status=? WHERE id=?`,
      [status, id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  } finally {
    await conn.end();
  }
}

