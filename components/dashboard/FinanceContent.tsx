"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";

interface PaymentRecord {
  id: string;
  companyName: string;
  serviceType: "Listing" | "Package" | "Web" | "Hosting" | "Other";
  amount: number;
  date: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  transactionId: string;
}

const mockData: PaymentRecord[] = [
  {
    id: "1",
    companyName: "Tech Innovators Ltd.",
    serviceType: "Listing",
    amount: 1200,
    date: "2025-11-01",
    paymentStatus: "Paid",
    transactionId: "TXN-092384",
  },
  {
    id: "2",
    companyName: "BizGrow Media",
    serviceType: "Package",
    amount: 3500,
    date: "2025-11-03",
    paymentStatus: "Pending",
    transactionId: "TXN-105923",
  },
  {
    id: "3",
    companyName: "SoftEdge Webworks",
    serviceType: "Web",
    amount: 8000,
    date: "2025-11-06",
    paymentStatus: "Paid",
    transactionId: "TXN-234231",
  },
  {
    id: "4",
    companyName: "HostX Solutions",
    serviceType: "Hosting",
    amount: 2500,
    date: "2025-11-07",
    paymentStatus: "Failed",
    transactionId: "TXN-764342",
  },
];

export default function FinanceContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockData.filter((record) =>
    record.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-xl font-semibold">Finance Overview</CardTitle>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <Input
                placeholder="Search company..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Payment Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
                  <TableRow key={record.id} className="hover:bg-gray-50 transition">
                    <TableCell className="font-medium">{record.companyName}</TableCell>
                    <TableCell>{record.serviceType}</TableCell>
                    <TableCell>{record.amount.toLocaleString()}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      {record.paymentStatus === "Paid" ? (
                        <Badge className="bg-green-100 text-green-700">Paid</Badge>
                      ) : record.paymentStatus === "Pending" ? (
                        <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700">Failed</Badge>
                      )}
                    </TableCell>
                    <TableCell>{record.transactionId}</TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
