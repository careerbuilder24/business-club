// import { NextResponse } from "next/server";
// import db from "@/lib/db";

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const { email, requestedPackage, message } = body;

//         if (!email || !requestedPackage) {
//             return NextResponse.json(
//                 { success: false, error: "Missing fields" },
//                 { status: 400 }
//             );
//         }

//         const [result]: any = await db.query(
//             `INSERT INTO package_upgrade_requests 
//       (email, requested_package, message)
//       VALUES (?, ?, ?)`,
//             [email, requestedPackage, message]
//         );

//         return NextResponse.json({
//             success: true,
//             data: result,
//         });

//     } catch (error) {
//         console.error(error);

//         return NextResponse.json(
//             { success: false, error: "Server error" },
//             { status: 500 }
//         );
//     }
// }

// export async function GET() {
//     try {

//         const [rows]: any = await db.query(`
//       SELECT *
//       FROM package_upgrade_requests
//       ORDER BY created_at DESC
//     `);

//         return NextResponse.json({
//             success: true,
//             requests: rows,
//         });

//     } catch (error) {
//         console.error(error);

//         return NextResponse.json({
//             success: false,
//             error: "Failed to fetch requests",
//         });
//     }
// }

// export async function DELETE(req: Request) {
//   try {
//     const body = await req.json();
//     const { id } = body;

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: "ID is required" },
//         { status: 400 }
//       );
//     }

//     await db.query(
//       `DELETE FROM package_upgrade_requests WHERE id = ?`,
//       [id]
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Request deleted successfully",
//     });

//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { success: false, error: "Delete failed" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(req: Request) {
//   try {
//     const body = await req.json();
//     const { id, status } = body;

//     if (!id || !status) {
//       return NextResponse.json(
//         { success: false, error: "ID and status are required" },
//         { status: 400 }
//       );
//     }

//     await db.query(
//       `UPDATE package_upgrade_requests 
//        SET status = ? 
//        WHERE id = ?`,
//       [status, id]
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Status updated successfully",
//     });

//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { success: false, error: "Failed to update status" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import db from "@/lib/db";

/* CREATE REQUEST */

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const { email, requestedPackage, message } = body;

    if (!email || !requestedPackage) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    await db.query(
      `INSERT INTO package_upgrade_requests 
      (email, requested_package, message)
      VALUES (?, ?, ?)`,
      [email, requestedPackage, message]
    );

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}


/* GET REQUESTS */

export async function GET() {
  try {

    const [rows]: any = await db.query(`
      SELECT *
      FROM package_upgrade_requests
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      success: true,
      requests: rows,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Failed to fetch requests",
    });

  }
}


/* UPDATE STATUS */

export async function PATCH(req: Request) {
  try {

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID and status required" },
        { status: 400 }
      );
    }

    await db.query(
      `UPDATE package_upgrade_requests 
       SET status = ? 
       WHERE id = ?`,
      [status, id]
    );

    return NextResponse.json({
      success: true,
      message: "Status updated"
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to update status" },
      { status: 500 }
    );

  }
}


/* DELETE REQUEST */

export async function DELETE(req: Request) {
  try {

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    await db.query(
      `DELETE FROM package_upgrade_requests WHERE id = ?`,
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { success: false, error: "Delete failed" },
      { status: 500 }
    );

  }
}