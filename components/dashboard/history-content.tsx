"use client";

import React, { useMemo, useState } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import useBusinessClubPayments from "@/hooks/usePayments";
import useLoggedUser from "@/hooks/useLoggedUser";

// Match your logged user type from profile-content
interface LoggedUser {
  id: number;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export default function HistoryContent() {
  const { payments, isLoading } = useBusinessClubPayments() as {
    payments: any[] | null;
    isLoading?: boolean;
  };

  const {
    loggedUser,
    loading: userLoading,
    error: userError,
  } = useLoggedUser() as {
    loggedUser: LoggedUser | null;
    loading: boolean;
    error: any;
  };
  console.log(payments);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

  // Combine loading states
  const combinedLoading = Boolean(isLoading || userLoading);

  // If no user at all
  if (!combinedLoading && !loggedUser) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Package Purchase History
        </h2>
        <p className="text-sm text-gray-500">
          Please log in to view your package purchase history.
        </p>
      </div>
    );
  }

  const historyData = useMemo(() => {
    if (!payments || payments.length === 0) return [];
    if (!loggedUser) return [];

    // 🔹 Normalize logged-in user email (supporting possible different shapes)
    const userEmail =
      (loggedUser as any).email?.toString().trim().toLowerCase() ??
      (loggedUser as any).user?.email?.toString().trim().toLowerCase() ??
      "";

    if (!userEmail) return [];

    // 🔹 Filter only payments belonging to this email
    const userPayments = payments.filter((payment) => {
      const paymentEmail = (
        payment.email ||
        payment.user_email ||
        payment.customer_email ||
        ""
      )
        .toString()
        .trim()
        .toLowerCase();

      // Debug if needed
      // console.log("paymentEmail:", paymentEmail, "userEmail:", userEmail);

      return paymentEmail === userEmail;
    });

    // console.log("Filtered payments for user:", userPayments);

    const today = new Date();

    return userPayments.map((payment) => {
      const purchaseDateObj = new Date(payment.created_at);
      const expiryDateObj = new Date(purchaseDateObj);
      expiryDateObj.setFullYear(expiryDateObj.getFullYear() + 1);

      const diffMs = expiryDateObj.getTime() - today.getTime();
      const daysLeft =
        diffMs > 0 ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : 0;

      return {
        id: payment.id,
        name: payment.package_name || payment.package_id || "Unknown Package",
        purchasedDate: purchaseDateObj.toISOString().slice(0, 10),
        expiryDate: expiryDateObj.toISOString().slice(0, 10),
        daysLeft,
        status: payment.status?.toLowerCase() || "pending",
        raw: payment,
      };
    });
  }, [payments, loggedUser]);

  // ---------- RECEIPT VIEW ----------
  if (selectedPayment) {
    const p = selectedPayment;
    const created = new Date(p.created_at);

    const receiptDate = created.toLocaleDateString();
    const receiptTime = created.toLocaleTimeString();
    // console.log(combinedLoading)
    return (
      <>
        {/* PRINT-ONLY STYLES */}
        <style jsx global>{`
          @media print {
            @page {
              size: A4;
              margin: 10mm;
            }

            body {
              margin: 0;
              padding: 0;
            }

            body * {
              visibility: hidden;
            }

            #receipt-print,
            #receipt-print * {
              visibility: visible;
            }

            #receipt-print {
              position: fixed;
              inset: 0;
              margin: 0;
              box-sizing: border-box;
              width: 100%;
              border-radius: 0;
            }
          }
        `}</style>

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-center text-[#2C8845] mb-2">
            Payment Receipt
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Below is your payment receipt copy. You can print or save it as PDF
            for your records.
          </p>

          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setSelectedPayment(null)}
              className="text-sm text-[#2C8845] hover:underline"
            >
              ← Back to details
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="bg-[#2C8845] text-white text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-[#256c38]"
              >
                Print / Download PDF
              </button>
            </div>
          </div>

          {/* THIS PART WILL PRINT FULL PAGE */}
          <div
            id="receipt-print"
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 relative"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 border-b border-gray-200 pb-4 mb-4">
              <div>
                <h3 className="font-bold text-[#206438]">
                  Business Club – Payment Receipt
                </h3>
                <p className="text-xs text-gray-500">
                  This is a system-generated copy for your reference.
                </p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>Receipt Date: {receiptDate}</div>
                <div>Time: {receiptTime}</div>
              </div>
            </div>

            {/* Member information */}
            <section className="mb-4">
              <h4 className="font-semibold text-sm text-gray-800 mb-1">
                Member information
              </h4>
              <div className="text-sm text-gray-700 grid md:grid-cols-2 gap-1">
                <div>
                  <span className="font-semibold">Name: </span>
                  {p.member_name}
                </div>
                <div>
                  <span className="font-semibold">Mobile: </span>
                  {p.mobile}
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold">Email: </span>
                  {p.email}
                </div>
              </div>
            </section>

            {/* Package details */}
            <section className="mb-4">
              <h4 className="font-semibold text-sm text-gray-800 mb-1">
                Package details
              </h4>
              <div className="text-sm text-gray-700 grid md:grid-cols-2 gap-1">
                <div>
                  <span className="font-semibold">Package name: </span>
                  {p.package_name}
                </div>
                <div>
                  <span className="font-semibold">Member type: </span>
                  {p.member_type}
                </div>
                <div>
                  <span className="font-semibold">Package price: </span>
                  {p.package_price_text || `${p.amount_numeric} (+VAT)`}
                </div>
                <div>
                  <span className="font-semibold">ID Card: </span>
                  {p.id_card}
                </div>
              </div>
            </section>

            {/* Payment information */}
            <section className="mb-4">
              <h4 className="font-semibold text-sm text-gray-800 mb-1">
                Payment information
              </h4>
              <div className="text-sm text-gray-700 grid md:grid-cols-2 gap-1">
                <div>
                  <span className="font-semibold">Payment method: </span>
                  {p.payment_method}
                </div>
                <div>
                  <span className="font-semibold">Sender bKash number: </span>
                  {p.sender_wallet_number}
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold">TRX ID: </span>
                  {p.trx_id}
                </div>
              </div>
            </section>

            {/* Note */}
            {p.note && (
              <section className="mb-4">
                <h4 className="font-semibold text-sm text-gray-800 mb-1">
                  Note
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {p.note}
                </p>
              </section>
            )}

            {/* Terms */}
            <section className="mt-4 border-t border-gray-200 pt-3">
              <h4 className="font-semibold text-sm text-gray-800 mb-1">
                Important terms (summary)
              </h4>
              <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                <li>
                  Once a membership package is confirmed and payment is
                  completed, it cannot be cancelled or refunded.
                </li>
                <li>
                  Package changes (upgrade only) may be possible by contacting
                  our support team before activation is completed.
                </li>
                <li>
                  This receipt is valid only with the correct TRX ID and sender
                  bKash/Nagad number.
                </li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                Thank you for your payment. Your membership activation will be
                confirmed by our team shortly. For any query, please contact our
                support with this receipt and TRX ID.
              </p>
            </section>

            <p className="mt-4 text-[10px] text-gray-400">
              Tip: Click <strong>Print / Download PDF</strong> and select{" "}
              <strong>Save as PDF</strong> in your browser printer dialog to
              keep a digital copy.
            </p>
          </div>
        </div>
      </>
    );
  }
  console.log(combinedLoading);
  // ---------- LIST VIEW ----------
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Package Purchase History
      </h2>

      {combinedLoading && <p className="text-gray-500 text-sm">Loading...</p>}

      {!combinedLoading && historyData.length === 0 && (
        <p className="text-gray-500 text-sm">
          No package purchase history found for this account.{" "}
          <span className="font-medium text-[#2C8845]">Choose Package</span> to
          get started.
        </p>
      )}

      {!combinedLoading &&
        historyData.map((item) => {
          const isPending = item.status === "pending";
          const isApproved = item.status === "approved";
          const isActive = isApproved && item.daysLeft > 0;
          const isExpired = isApproved && item.daysLeft <= 0;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedPayment(item.raw)}
              className={`w-full text-left relative bg-white shadow-sm rounded-xl cursor-pointer border p-6 hover:shadow-md transition-all ${
                isPending
                  ? "border-yellow-300 ring-1 ring-yellow-200"
                  : isActive
                  ? "border-[#2C8845] ring-1 ring-[#2C8845]"
                  : isExpired
                  ? "border-red-300 ring-1 ring-red-200"
                  : "border-gray-200"
              }`}
            >
              {/* Status Badge */}
              {isPending && (
                <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Pending Approval
                </span>
              )}
              {isActive && (
                <span className="absolute top-3 right-3 bg-[#2C8845] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Active
                </span>
              )}
              {isExpired && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Expired
                </span>
              )}

              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      isActive
                        ? "text-[#2C8845]"
                        : isExpired
                        ? "text-red-600"
                        : isPending
                        ? "text-yellow-600"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Purchased: {item.purchasedDate}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires: {item.expiryDate}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isPending ? (
                    <>
                      <AlertCircle className="text-yellow-500" size={20} />
                      <span className="text-yellow-500 font-medium">
                        Pending Approval
                      </span>
                    </>
                  ) : isActive ? (
                    <>
                      <Clock className="text-[#2C8845]" size={20} />
                      <span className="text-[#2C8845] font-medium">
                        {item.daysLeft} days remaining
                      </span>
                    </>
                  ) : isExpired ? (
                    <>
                      <XCircle className="text-red-500" size={20} />
                      <span className="text-red-500 font-medium">Expired</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="text-gray-400" size={20} />
                      <span className="text-gray-400 font-medium">
                        Inactive
                      </span>
                    </>
                  )}
                </div>
              </div>
            </button>
          );
        })}
    </div>
  );
}
