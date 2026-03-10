


// import { NextRequest, NextResponse } from "next/server";
// import mysql from "mysql2/promise";

// const pool = mysql.createPool({

//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,

// });

// /* ================= POST ================= */



// export async function POST(req: NextRequest) {
//   try {

//     const body = await req.json();

//     const packages = body.packages || [];
//     const services = body.services || [];
//     const subSections = body.subSections || [];
//     const data = body.data || {};

//     const connection = await pool.getConnection();

//     const sql = `
//       INSERT INTO package_tables 
//       (id, packages, services, sub_sections, matrix)
//       VALUES (1, ?, ?, ?, ?)
//       ON DUPLICATE KEY UPDATE
//       packages = VALUES(packages),
//       services = VALUES(services),
//       sub_sections = VALUES(sub_sections),
//       matrix = VALUES(matrix)
//     `;

//     await connection.execute(sql, [
//       JSON.stringify(packages),
//       JSON.stringify(services),
//       JSON.stringify(subSections),
//       JSON.stringify(data),
//     ]);

//     connection.release();

//     return NextResponse.json({
//       success: true
//     });

//   } catch (err) {

//     console.error("POST ERROR:", err);

//     return NextResponse.json({
//       success: false,
//       error: (err as Error).message
//     });

//   }
// }



// export async function GET() {

//   try {

//     const connection = await pool.getConnection();

//     const [rows]: any = await connection.execute(
//       "SELECT * FROM package_tables WHERE id = 1 LIMIT 1"
//     );

//     connection.release();

//     if (!rows.length) {
//       return NextResponse.json({
//         success: true,
//         data: null
//       });
//     }

//     const row = rows[0];

//     const safeParseArray = (value: any) => {

//       if (!value) return [];

//       try {

//         if (typeof value === "object") return value;

//         if (value.startsWith("["))
//           return JSON.parse(value);

//         return value.split(",");

//       } catch {
//         return [];
//       }

//     };

//     const safeParseObject = (value: any) => {

//       if (!value) return {};

//       try {

//         if (typeof value === "object") return value;

//         if (value.startsWith("{"))
//           return JSON.parse(value);

//         return {};

//       } catch {
//         return {};
//       }

//     };

//     return NextResponse.json({

//       success: true,

//       data: {

//         packages: safeParseArray(row.packages),
//         services: safeParseArray(row.services),
//         subSections: safeParseArray(row.sub_sections),
//         data: safeParseObject(row.matrix),

//       }

//     });

//   } catch (err) {

//     console.error("GET ERROR:", err);

//     return NextResponse.json({
//       success: false,
//       error: (err as Error).message
//     });

//   }

// }

// /* ================= UPDATE ROW ================= */

// export async function PUT(req: NextRequest) {
//   try {

//     const body = await req.json();

//     const { serviceName, values } = body;

//     const connection = await pool.getConnection();

//     const [rows]: any = await connection.execute(
//       "SELECT matrix FROM package_tables WHERE id = 1 LIMIT 1"
//     );

//     if (!rows.length) {
//       return NextResponse.json({ success: false });
//     }

//     const matrix = JSON.parse(rows[0].matrix || "{}");

//     matrix[serviceName] = values;

//     await connection.execute(
//       "UPDATE package_tables SET matrix=? WHERE id=1",
//       [JSON.stringify(matrix)]
//     );

//     connection.release();

//     return NextResponse.json({ success: true });

//   } catch (err) {

//     console.error("PUT ERROR:", err);

//     return NextResponse.json({
//       success: false,
//       error: (err as Error).message
//     });

//   }
// }

// /* ================= DELETE SERVICE ================= */

// // export async function DELETE(req: NextRequest) {

// //   try {

// //     const { serviceName } = await req.json();

// //     const connection = await pool.getConnection();

// //     const [rows]: any = await connection.execute(
// //       "SELECT services, sub_sections, matrix FROM package_tables WHERE id = 1"
// //     );

// //     if (!rows.length) {
// //       return NextResponse.json({ success: false });
// //     }

// //     const services = JSON.parse(rows[0].services || "[]");
// //     const subSections = JSON.parse(rows[0].sub_sections || "[]");
// //     const matrix = JSON.parse(rows[0].matrix || "{}");

// //     /* remove service */

// //     const index = services.indexOf(serviceName);

// //     if (index !== -1) {
// //       services.splice(index, 1);
// //       subSections.splice(index, 1);
// //     }

// //     delete matrix[serviceName];

// //     await connection.execute(
// //       `UPDATE package_tables 
// //        SET services=?, sub_sections=?, matrix=? 
// //        WHERE id=1`,
// //       [
// //         JSON.stringify(services),
// //         JSON.stringify(subSections),
// //         JSON.stringify(matrix)
// //       ]
// //     );

// //     connection.release();

// //     return NextResponse.json({
// //       success: true
// //     });

// //   } catch (err) {

// //     console.error("DELETE ERROR:", err);

// //     return NextResponse.json({
// //       success: false,
// //       error: (err as Error).message
// //     });

// //   }

// // }

// export async function DELETE(req: NextRequest) {

//   try {

//     const body = await req.json();
//     const serviceName = body.serviceName;

//     const connection = await pool.getConnection();

//     const [rows]: any = await connection.execute(
//       "SELECT services, sub_sections, matrix FROM package_tables WHERE id = 1"
//     );

//     if (!rows.length) {
//       connection.release();
//       return NextResponse.json({ success: false });
//     }

//     let services = JSON.parse(rows[0].services || "[]");
//     let subSections = JSON.parse(rows[0].sub_sections || "[]");
//     let matrix = JSON.parse(rows[0].matrix || "{}");

//     const index = services.indexOf(serviceName);

//     if (index !== -1) {
//       services.splice(index, 1);
//       subSections.splice(index, 1);
//     }

//     delete matrix[serviceName];

//     await connection.execute(
//       `UPDATE package_tables 
//        SET services=?, sub_sections=?, matrix=? 
//        WHERE id=1`,
//       [
//         JSON.stringify(services),
//         JSON.stringify(subSections),
//         JSON.stringify(matrix)
//       ]
//     );

//     connection.release();

//     return NextResponse.json({ success: true });

//   } catch (err) {

//     console.error("DELETE ERROR:", err);

//     return NextResponse.json({
//       success: false,
//       error: (err as Error).message
//     });

//   }

// }

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

/* ================= HELPERS ================= */

const safeParseArray = (value: any) => {

  if (!value) return [];

  try {

    if (typeof value === "object") return value;

    if (value.startsWith("[")) {
      return JSON.parse(value);
    }

    return value.split(",");

  } catch {

    return [];

  }

};

const safeParseObject = (value: any) => {

  if (!value) return {};

  try {

    if (typeof value === "object") return value;

    if (value.startsWith("{")) {
      return JSON.parse(value);
    }

    return {};

  } catch {

    return {};

  }

};

/* ================= POST ================= */

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    const packages = body.packages || [];
    const services = body.services || [];
    const subSections = body.subSections || [];
    const data = body.data || {};

    const connection = await pool.getConnection();

    const sql = `
      INSERT INTO package_tables 
      (id, packages, services, sub_sections, matrix)
      VALUES (1, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      packages = VALUES(packages),
      services = VALUES(services),
      sub_sections = VALUES(sub_sections),
      matrix = VALUES(matrix)
    `;

    await connection.execute(sql, [
      JSON.stringify(packages),
      JSON.stringify(services),
      JSON.stringify(subSections),
      JSON.stringify(data),
    ]);

    connection.release();

    return NextResponse.json({
      success: true,
    });

  } catch (err) {

    console.error("POST ERROR:", err);

    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });

  }

}

/* ================= GET ================= */

export async function GET() {

  try {

    const connection = await pool.getConnection();

    const [rows]: any = await connection.execute(
      "SELECT * FROM package_tables WHERE id = 1 LIMIT 1"
    );

    connection.release();

    if (!rows.length) {

      return NextResponse.json({
        success: true,
        data: null,
      });

    }

    const row = rows[0];

    return NextResponse.json({

      success: true,

      data: {

        packages: safeParseArray(row.packages),

        services: safeParseArray(row.services),

        subSections: safeParseArray(row.sub_sections),

        data: safeParseObject(row.matrix),

      },

    });

  } catch (err) {

    console.error("GET ERROR:", err);

    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });

  }

}

/* ================= UPDATE ROW ================= */

export async function PUT(req: NextRequest) {

  try {

    const body = await req.json();

    const { serviceName, values } = body;

    const connection = await pool.getConnection();

    const [rows]: any = await connection.execute(
      "SELECT matrix FROM package_tables WHERE id = 1 LIMIT 1"
    );

    if (!rows.length) {

      connection.release();

      return NextResponse.json({
        success: false,
      });

    }

    const matrix = safeParseObject(rows[0].matrix);

    matrix[serviceName] = values;

    await connection.execute(
      "UPDATE package_tables SET matrix=? WHERE id=1",
      [JSON.stringify(matrix)]
    );

    connection.release();

    return NextResponse.json({
      success: true,
    });

  } catch (err) {

    console.error("PUT ERROR:", err);

    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });

  }

}

/* ================= DELETE SERVICE ================= */

export async function DELETE(req: NextRequest) {

  try {

    const body = await req.json();

    const serviceName = body.serviceName;

    const connection = await pool.getConnection();

    const [rows]: any = await connection.execute(
      "SELECT services, sub_sections, matrix FROM package_tables WHERE id = 1"
    );

    if (!rows.length) {

      connection.release();

      return NextResponse.json({
        success: false,
      });

    }

    let services = safeParseArray(rows[0].services);

    let subSections = safeParseArray(rows[0].sub_sections);

    let matrix = safeParseObject(rows[0].matrix);

    const index = services.indexOf(serviceName);

    if (index !== -1) {

      services.splice(index, 1);

      subSections.splice(index, 1);

    }

    delete matrix[serviceName];

    await connection.execute(
      `UPDATE package_tables 
       SET services=?, sub_sections=?, matrix=? 
       WHERE id=1`,
      [
        JSON.stringify(services),
        JSON.stringify(subSections),
        JSON.stringify(matrix),
      ]
    );

    connection.release();

    return NextResponse.json({
      success: true,
    });

  } catch (err) {

    console.error("DELETE ERROR:", err);

    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });

  }

}