"use client";

import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import useFinanceRecords from "@/hooks/useFinance";

// For PDF export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function FinanceContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const { records, loading, error } = useFinanceRecords();

  // Filter Records
  const filteredData = records.filter((record) =>
    record.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const maskDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear());
    return `${day}•${month}•${year}`;
  };

  // ===========================
  // EXPORT AS PDF
  // ===========================
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Finance Payment Records", 14, 15);

    // const tableData = filteredData.map((r) => [
    //   r.company,
    //   r.service_type,
    //   r.amount,
    //  maskDate(r.payment_date),
    //   r.payment_status,
    //   r.transaction_id,
    // ]);
    const tableData = filteredData.map((r) => [
      r.company,
      r.service_type,
      r.amount,
      maskDate(r.payment_date),
      r.payment_status,
      r.transaction_id,
    ]);

    autoTable(doc, {
      startY: 20,
      head: [
        ["Company", "Service", "Amount", "Date", "Status", "Transaction ID"],
      ],
      body: tableData,
    });

    doc.save("finance-records.pdf");
  };

  // ===========================
  // PRINT TABLE
  // ===========================
  const printTable = () => {
    const printContents = document.getElementById("finance-table")?.innerHTML;

    const printWindow = window.open("", "", "width=900,height=700");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
      <head>
        <title>Print Finance Records</title>
        <style>
          table { width: 100%; border-collapse: collapse; font-size: 14px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>
        <h2>Finance Payment Records</h2>
        ${printContents}
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-xl font-semibold">
            Finance Overview
          </CardTitle>

          {/* Search + Export */}
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search company..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Export Dropdown */}
            <Button
              onClick={exportPDF}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download size={16} />
              PDF
            </Button>

            <Button
              onClick={printTable}
              variant="outline"
              className="flex items-center gap-2"
            >
              Print
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* TABLE */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Payment Records
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-red-500 py-4 text-center">{error}</div>
          ) : (
            <div id="finance-table" className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount (৳)</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction ID</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.company}</TableCell>
                      <TableCell>{record.service_type}</TableCell>
                      <TableCell>{record.amount.toLocaleString()}</TableCell>
                      {/* <TableCell>{record.payment_date}</TableCell> */}
                      {/* <TableCell>
                        {(() => {
                          const d = new Date(record.payment_date);
                          const day = String(d.getDate()).padStart(2, "0");
                          const month = String(d.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const year = String(d.getFullYear()).slice(-2);
                          return `${day}•${month}•20${year}`;
                        })()}
                      </TableCell> */}
                      <TableCell>{maskDate(record.payment_date)}</TableCell>


                      <TableCell>
                        {record.payment_status === "Paid" ? (
                          <Badge className="bg-green-100 text-green-700">
                            Paid
                          </Badge>
                        ) : record.payment_status === "Pending" ? (
                          <Badge className="bg-yellow-100 text-yellow-700">
                            Pending
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700">
                            Failed
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell>{record.transaction_id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
