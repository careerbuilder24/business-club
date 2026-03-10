"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import useBusinessClubPayments from "@/hooks/usePayments";
import useLoggedUser from "@/hooks/useLoggedUser";

// Match profile-content type
interface LoggedUser {
  id: number;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export default function PackagesContent() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // checkout form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // will be set from loggedUser
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad">(
    "bkash",
  );
  const [walletNumber, setWalletNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [note, setNote] = useState("");

  // UI states
  const [showReceipt, setShowReceipt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upgradePackage, setUpgradePackage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  // Logged user (to inject email)
  const {
    loggedUser,
    loading: userLoading,
    error: userError,
  } = useLoggedUser() as {
    loggedUser: LoggedUser | null;
    loading: boolean;
    error: any;
  };

  // When loggedUser loads, sync email state
  useEffect(() => {
    if (loggedUser?.email) {
      setEmail(loggedUser.email);
    }
  }, [loggedUser]);

  const handleSelectPackage = (id: string) => {
    setSelectedPackage(id);
    setShowReceipt(false);
  };

  // ====== ADMIN REQUEST MODAL HANDLERS ( CORRECT PLACE) ======

  const openRequestModal = () => {
    if (!upgradePackage) {
      alert("Please select a package first.");
      return;
    }
    setIsModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsModalOpen(false);
    setAdminMessage("");
  };

  const handleSendToAdmin = async () => {
    if (!adminMessage.trim()) {
      alert("Please write a message.");
      return;
    }

    try {
      setSendingMessage(true);

      const payload = {
        email: loggedUser?.email,
        requestedPackage: upgradePackage,
        message: adminMessage,
      };

      // console.log("Send to admin:", payload);

      const res = await fetch("/api/package-upgrade-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      alert("Admin request sent. Please complete payment for upgrade.");

      //  KEY PART — MOVE USER TO CHECKOUT
      setSelectedPackage(upgradePackage); // show checkout
      setShowReceipt(false);
      setAdminMessage("");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    } finally {
      setSendingMessage(false);
    }
  };

  const packages = [
    {
      id: "starter",
      name: "Starter",
      price: "6000/Year (+5% VAT)",
      data: {
        "Package Price": "6000/Year (+5% VAT)",
        "Member Type": "Basic Member",
        "ID Card": "Gray Card",

        "Business Training": "Basic Training",
        "SEO Training": "Basic Training",
        "SMM Training": "Basic Training",

        "SOURCES Page": "14 Products",
        "Domain (.com)": "No",
        "Web Hosting": "No",
        "Business Website": "No",
        "eCommerce Website": "No",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "No",

        "SMM Service": "No",
        "SEO Service": "No",
        "Press Release": "No",

        "Blog Writing Service": "No",
        "Website Content Writing": "No",

        "Video Ad": "No",
        "Motion Ad": "No",

        Consultancy: "1 Hour",
      },
    },
    {
      id: "growth",
      name: "Growth",
      price: "12000/Year (+5% VAT)",
      data: {
        "Package Price": "12000/Year (+5% VAT)",
        "Member Type": "Standard Member",
        "ID Card": "Blue Card",

        "Business Training": "Standard Training",
        "SEO Training": "Standard Training",
        "SMM Training": "Standard Training",

        "SOURCES Page": "28 Products",
        "Domain (.com)": "Yes",
        "Web Hosting": "1 GB",
        "Business Website": "No",
        "eCommerce Website": "No",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "24 Designs",

        "SMM Service": "Yes",
        "SEO Service": "No",
        "Press Release": "No",

        "Blog Writing Service": "No",
        "Website Content Writing": "No",

        "Video Ad": "No",
        "Motion Ad": "No",

        Consultancy: "2 Hours",
      },
    },
    {
      id: "smart",
      name: "Smart",
      price: "25000/Year (+5% VAT)",
      data: {
        "Package Price": "25000/Year (+5% VAT)",
        "Member Type": "Smart Member",
        "ID Card": "Green Card",

        "Business Training": "Smart Training",
        "SEO Training": "Smart Training",
        "SMM Training": "Smart Training",

        "SOURCES Page": "56 Products",
        "Domain (.com)": "Yes",
        "Web Hosting": "3 GB",
        "Business Website": "10 Page Website",
        "eCommerce Website": "No",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "48 Designs",

        "SMM Service": "Yes",
        "SEO Service": "Yes",
        "Press Release": "1",

        "Blog Writing Service": "10,000 Words",
        "Website Content Writing": "5000 Words",

        "Video Ad": "1",
        "Motion Ad": "1",

        Consultancy: "3 Hours",
      },
    },
    {
      id: "premium",
      name: "Premium",
      price: "50000/Year (+5% VAT)",
      data: {
        "Package Price": "50000/Year (+5% VAT)",
        "Member Type": "Premium Member",
        "ID Card": "Purple Card",

        "Business Training": "Premium Training",
        "SEO Training": "Premium Training",
        "SMM Training": "Premium Training",

        "SOURCES Page": "112 Products",
        "Domain (.com)": "Yes",
        "Web Hosting": "6 GB",
        "Business Website": "15 Page Website",
        "eCommerce Website": "Yes",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "96 Designs",

        "SMM Service": "Yes",
        "SEO Service": "Yes",
        "Press Release": "2",

        "Blog Writing Service": "20,000 Words",
        "Website Content Writing": "10,000 Words",

        "Video Ad": "2",
        "Motion Ad": "2",

        Consultancy: "4 Hours",
      },
    },
    {
      id: "elite",
      name: "Elite",
      price: "75000/Year (+5% VAT)",
      data: {
        "Package Price": "75000/Year (+5% VAT)",
        "Member Type": "Elite Member",
        "ID Card": "Gold Card",

        "Business Training": "Elite Training",
        "SEO Training": "Elite Training",
        "SMM Training": "Elite Training",

        "SOURCES Page": "224 Products",
        "Domain (.com)": "Yes",
        "Web Hosting": "10 GB",
        "Business Website": "20 Page Website",
        "eCommerce Website": "Yes",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "192 Designs",

        "SMM Service": "Yes",
        "SEO Service": "Yes",
        "Press Release": "3",

        "Blog Writing Service": "20,000 Words",
        "Website Content Writing": "10,000 Words",

        "Video Ad": "3",
        "Motion Ad": "3",

        Consultancy: "5 Hours",
      },
    },
    {
      id: "vip",
      name: "VIP",
      price: "100000/Year (+5% VAT)",
      data: {
        "Package Price": "100000/Year (+5% VAT)",
        "Member Type": "VIP Member",
        "ID Card": "Black Card",

        "Business Training": "VIP Training",
        "SEO Training": "VIP Training",
        "SMM Training": "VIP Training",

        "SOURCES Page": "448 Products",
        "Domain (.com)": "Yes",
        "Web Hosting": "15 GB",
        "Business Website": "25 Page Website",
        "eCommerce Website": "Yes",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "384 Designs",

        "SMM Service": "Yes",
        "SEO Service": "Yes",
        "Press Release": "4",

        "Blog Writing Service": "50,000 Words",
        "Website Content Writing": "25,000 Words",

        "Video Ad": "4",
        "Motion Ad": "4",

        Consultancy: "6 Hours",
      },
    },
  ];

  const groupedServices = {
    "Basic Services": ["Package Price", "Member Type", "ID Card"],
    "Training Program": ["Business Training", "SEO Training", "SMM Training"],
    "Platform Setup for Online Presence": [
      "SOURCES Page",
      "Domain (.com)",
      "Web Hosting",
      "Business Website",
      "eCommerce Website",
    ],
    "Platform Setup for Digital Marketing": [
      "Facebook Page",
      "LinkedIn Page",
      "YouTube Channel",
      "TikTok Profile",
    ],
    "Graphic Design Services": [
      "Logo Design",
      "Visiting Card Design",
      "Social Media Design",
    ],
    "Digital Marketing Services": [
      "SMM Service",
      "SEO Service",
      "Press Release",
    ],
    "Content Writing Services": [
      "Blog Writing Service",
      "Website Content Writing",
    ],
    "Video Creation": ["Video Ad", "Motion Ad"],
    "Business Consultancy": ["Consultancy"],
  };

  const activePackage = packages.find((p) => p.id === selectedPackage);

  const pageTitle = !selectedPackage
    ? "Business Club Packages"
    : showReceipt
      ? "Payment Receipt"
      : "Checkout & Confirmation";

  const pageSubtitle = !selectedPackage
    ? "Compare all packages and choose the one that fits your business best. Join our Business Club and grow your brand visibility effectively!"
    : showReceipt
      ? "Below is your payment receipt copy. You can print or save it as PDF for your records."
      : "Please confirm your details and payment information to complete your membership.";

  // =============== SUBMIT HANDLER (CALLS API) ===============
  const handleSubmitCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activePackage) {
      alert("Please select a package first.");
      return;
    }

    if (!fullName || !phone || !walletNumber || !trxId) {
      alert("Please fill in all required fields (*) before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);

      const body = {
        memberName: fullName,
        mobile: phone,
        // email comes from state, which is set from loggedUser
        email: email || null,
        packageId: activePackage.id,
        packageName: activePackage.name,
        packagePriceText: activePackage.data["Package Price"],
        memberType: activePackage.data["Member Type"],
        idCard: activePackage.data["ID Card"],
        paymentMethod,
        senderWalletNumber: walletNumber,
        trxId,
        note: note || null,
      };

      console.log("Submitting to backend:", body);

      const res = await fetch("/api/business-club-payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit payment info.");
      }

      // Only show receipt if backend save succeeded
      setShowReceipt(true);
    } catch (err: any) {
      console.error("Checkout submit error:", err);
      alert(
        err?.message ||
          "Something went wrong while saving your payment. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // print only the receipt by opening a separate window
  const handlePrint = () => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const receipt = document.getElementById("receipt-copy");
    if (!receipt) {
      window.print(); // fallback
      return;
    }

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    const headHtml = document.head.innerHTML;

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          ${headHtml}
          <title>Payment Receipt</title>
        </head>
        <body class="bg-gray-100">
          <div class="min-h-screen flex items-start justify-center py-10">
            <div class="max-w-2xl w-full px-4">
              ${receipt.outerHTML}
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const { payments } = useBusinessClubPayments();

  console.log(payments);
  console.log(loggedUser);

  const hasExistingPayment = React.useMemo(() => {
    if (!loggedUser?.email || !payments?.length) return false;

    return payments.some(
      (payment: any) =>
        payment.email?.toLowerCase() === loggedUser.email.toLowerCase(),
    );
  }, [payments, loggedUser]);

  const isPackageSelectionLocked = React.useMemo(() => {
    return (
      hasExistingPayment ||
      selectedPackage !== null ||
      isSubmitting ||
      showReceipt
    );
  }, [hasExistingPayment, selectedPackage, isSubmitting, showReceipt]);

  console.log("Has existing payment:", hasExistingPayment);

  return (
    <div className="py-1 bg-white text-gray-800 container mx-auto">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-[#2C8845] mb-2">
              Request Package Change
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              Selected package:{" "}
              <span className="font-semibold">
                {packages.find((p) => p.id === upgradePackage)?.name}
              </span>
            </p>

            <textarea
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-[#2C8845]"
              placeholder="Write your message to admin (upgrade request, reason, etc.)"
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={closeRequestModal}
                disabled={sendingMessage}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSendToAdmin}
                disabled={sendingMessage}
                className="bg-[#2C8845] hover:bg-[#25973F] text-white"
              >
                {sendingMessage ? "Sending..." : "Send Request"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto text-center mb-8 px-4">
        <h2 className="text-3xl font-bold mb-3 text-[#2C8845]">{pageTitle}</h2>
        <p className="max-w-2xl mx-auto text-gray-600">{pageSubtitle}</p>
      </div>

      {/* TABLE – only when no package selected */}
      {!selectedPackage && (
        <div className="overflow-x-auto px-6 mb-10">
          {hasExistingPayment && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
              <select
                value={upgradePackage}
                onChange={(e) => setUpgradePackage(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-64"
              >
                <option value="">Select a package</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} – {pkg.price}
                  </option>
                ))}
              </select>

              <Button
                onClick={openRequestModal}
                className="bg-[#2C8845] hover:bg-[#25973F] text-white px-5"
              >
                Request to Admin
              </Button>
            </div>
          )}

          <table className="min-w-full border border-gray-200 text-sm shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#2C8845] text-white">
              <tr>
                <th className="border border-gray-200 p-3 text-center font-semibold">
                  Services
                </th>
                {packages.map((pkg) => (
                  <th
                    key={pkg.id}
                    className={`border border-gray-200 p-3 text-center ${
                      pkg.id === "smart"
                        ? "bg-[#E8F6EE] text-[#2C8845]"
                        : "bg-[#2C8845]/90 text-white"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className={`text-lg font-bold ${
                          pkg.id === "smart" ? "text-[#2C8845]" : "text-white"
                        }`}
                      >
                        {pkg.name}
                      </span>
                      <span
                        className={`text-sm ${
                          pkg.id === "smart"
                            ? "text-[#2C8845]"
                            : "text-white/80"
                        }`}
                      >
                        {pkg.price}
                      </span>

                      <Button
                        onClick={() => handleSelectPackage(pkg.id)}
                        disabled={isPackageSelectionLocked}
                        className={`mt-2 text-xs py-1 px-3 rounded font-semibold ${
                          isPackageSelectionLocked
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : pkg.id === "smart"
                              ? "bg-[#2C8845] text-white hover:bg-[#25973F]"
                              : "bg-white text-[#2C8845] hover:bg-[#E8F6EE]"
                        }`}
                      >
                        {isPackageSelectionLocked ? "Locked" : "Choose"}
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Object.entries(groupedServices).map(([section, services]) => (
                <React.Fragment key={section}>
                  <tr className="bg-gray-100">
                    <td
                      colSpan={packages.length + 1}
                      className="p-3 font-semibold text-[#2C8845] text-center text-lg uppercase tracking-wide"
                    >
                      {section}
                    </td>
                  </tr>

                  {services.map((service, i) => (
                    <tr
                      key={service}
                      className={`border-t border-gray-200 ${
                        i % 2 === 0 ? "bg-white" : "bg-[#F9FBF9]"
                      }`}
                    >
                      <td className="p-3 text-left text-gray-700 font-medium">
                        {service}
                      </td>
                      {packages.map((pkg) => {
                        const value =
                          pkg.data[service as keyof typeof pkg.data];
                        const isYes = value === "Yes";
                        const isNo = value === "No";

                        return (
                          <td
                            key={pkg.id}
                            className={`text-center p-3 ${
                              pkg.id === "smart" ? "bg-[#F1FAF5]" : ""
                            }`}
                          >
                            {isYes ? (
                              <Check className="inline w-4 h-4 text-[#2C8845]" />
                            ) : isNo ? (
                              <X className="inline text-red-400 w-4 h-4" />
                            ) : (
                              <span className="text-gray-700 text-sm">
                                {value}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CHECKOUT FORM – when package selected & not submitted yet */}
      {activePackage && !showReceipt && (
        <div className="max-w-2xl mx-auto mt-4 mb-12 px-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-600">
              Selected package:{" "}
              <span className="font-semibold text-gray-900">
                {activePackage.name}
              </span>{" "}
              – {activePackage.data["Package Price"]}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedPackage(null);
                setShowReceipt(false);
              }}
              className="text-xs underline text-gray-500 hover:text-gray-700"
            >
              Change package
            </button>
          </div>

          <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-[#F9FBF9]">
            <h3 className="text-xl font-bold text-[#2C8845] mb-1">
              Checkout / Confirm Your Package
            </h3>

            <form onSubmit={handleSubmitCheckout} className="space-y-4 mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C8845]"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C8845]"
                    placeholder="01XXXXXXXXX"
                    required
                  />
                </div>

                {/* EMAIL – from loggedUser, disabled */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (logged in)
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-gray-100 cursor-not-allowed text-gray-700"
                    placeholder="you@example.com"
                  />
                  <p className="mt-1 text-[11px] text-gray-500">
                    This email is taken from your account and will be used for
                    your membership.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as "bkash" | "nagad")
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C8845]"
                  >
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    bKash/Nagad number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={walletNumber}
                    onChange={(e) => setWalletNumber(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C8845]"
                    placeholder="Sender wallet number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    TRX ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C8845]"
                    placeholder="Transaction ID"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C8845]"
                  rows={3}
                  placeholder="Any additional information (company name, invoice name, etc.)"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <input type="checkbox" required className="h-4 w-4" />
                <span>
                  I confirm that I have sent the payment to the provided{" "}
                  {paymentMethod === "bkash" ? "bKash" : "Nagad"} number and the
                  TRX ID is correct.
                </span>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-[#2C8845] hover:bg-[#25973F] text-white font-semibold px-6 py-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit & Request Activation"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECEIPT VIEW – after submit */}
      {activePackage && showReceipt && (
        <div className="max-w-2xl mx-auto mt-4 mb-12 px-6">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => {
                setShowReceipt(false);
              }}
              className="text-xs underline text-gray-500 hover:text-gray-700 print:hidden"
            >
              Back to details
            </button>

            <div className="space-x-2 print:hidden">
              <Button
                type="button"
                onClick={handlePrint}
                className="bg-[#2C8845] hover:bg-[#25973F] text-white text-sm px-4 py-1.5"
              >
                Print / Download PDF
              </Button>
              <button
                type="button"
                onClick={() => {
                  setSelectedPackage(null);
                  setShowReceipt(false);
                }}
                className="text-xs underline text-gray-500 hover:text-gray-700"
              >
                New request
              </button>
            </div>
          </div>

          <div
            id="receipt-copy"
            className="border border-gray-300 rounded-xl bg.white shadow-sm p-6 text-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-dashed pb-3 mb-3">
              <div>
                <h3 className="text-lg font-bold text-[#2C8845]">
                  Business Club – Payment Receipt
                </h3>
                <p className="text-xs text-gray-500">
                  This is a system-generated copy for your reference.
                </p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>Receipt Date: {new Date().toLocaleDateString()}</p>
                <p>Time: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            {/* Member info */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                Member information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                <p>
                  <span className="font-medium">Name: </span>
                  {fullName}
                </p>
                <p>
                  <span className="font-medium">Mobile: </span>
                  {phone}
                </p>
                <p>
                  <span className="font-medium">Email: </span>
                  {email || "-"}
                </p>
              </div>
            </div>

            {/* Package info */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                Package details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                <p>
                  <span className="font-medium">Package name: </span>
                  {activePackage.name}
                </p>
                <p>
                  <span className="font-medium">Member type: </span>
                  {activePackage.data["Member Type"]}
                </p>
                <p>
                  <span className="font-medium">Package price: </span>
                  {activePackage.data["Package Price"]}
                </p>
                <p>
                  <span className="font-medium">ID Card: </span>
                  {activePackage.data["ID Card"]}
                </p>
              </div>
            </div>

            {/* Payment info */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                Payment information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                <p>
                  <span className="font-medium">Payment method: </span>
                  {paymentMethod === "bkash" ? "bKash" : "Nagad"}
                </p>
                <p>
                  <span className="font-medium">
                    Sender {paymentMethod === "bkash" ? "bKash" : "Nagad"}{" "}
                    number:{" "}
                  </span>
                  {walletNumber}
                </p>
                <p>
                  <span className="font-medium">TRX ID: </span>
                  {trxId}
                </p>
              </div>
            </div>

            {/* Note */}
            {note && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-1">Note</h4>
                <p className="text-gray-700 whitespace-pre-line">{note}</p>
              </div>
            )}

            {/* Short Terms & Conditions */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-1">
                Important terms (summary)
              </h4>
              <ul className="text-xs text-gray-700 list-disc pl-5 space-y-1">
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
            </div>

            {/* Footer */}
            <div className="border-t border-dashed pt-3 mt-4 text-xs text-gray-500">
              <p>
                Thank you for your payment. Your membership activation will be
                confirmed by our team shortly.
              </p>
              <p className="mt-1">
                For any query, please contact our support with this receipt and
                TRX ID.
              </p>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-gray-500 print:hidden">
            Tip: Click{" "}
            <span className="font-semibold">Print / Download PDF</span> and
            select <span className="italic">Save as PDF</span> in your browser
            printer dialog to keep a digital copy.
          </p>
        </div>
      )}
    </div>
  );
}
