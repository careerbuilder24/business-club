
"use client";

import React, { useMemo, useState } from "react";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  X,
} from "lucide-react";
import useBusinessClubPayments, { BusinessClubPayment } from "@/hooks/usePayments";

type PackageStatus = "active" | "expired" | "pending" | "rejected";
type StatusFilter = "all" | "active" | "pending" | "rejected";

function getStatusStyles(status: PackageStatus) {
  switch (status) {
    case "active":
      return {
        border: "border-green-500",
        badgeBg: "bg-green-600",
        badgeText: "text-white",
        iconText: "text-green-600",
        helperText: "text-green-700",
      };
    case "pending":
      return {
        border: "border-amber-400",
        badgeBg: "bg-amber-500",
        badgeText: "text-white",
        iconText: "text-amber-500",
        helperText: "text-amber-600",
      };
    case "rejected":
      return {
        border: "border-rose-500",
        badgeBg: "bg-rose-600",
        badgeText: "text-white",
        iconText: "text-rose-600",
        helperText: "text-rose-700",
      };
    case "expired":
    default:
      return {
        border: "border-red-400",
        badgeBg: "bg-red-600",
        badgeText: "text-white",
        iconText: "text-red-600",
        helperText: "text-red-700",
      };
  }
}

function getStatusIcon(status: PackageStatus) {
  switch (status) {
    case "active":
      return <CheckCircle2 className="h-4 w-4" />;
    case "pending":
      return <AlertCircle className="h-4 w-4" />;
    case "rejected":
      return <XCircle className="h-4 w-4" />;
    case "expired":
    default:
      return <XCircle className="h-4 w-4" />;
  }
}

function mapPaymentToUi(payment: BusinessClubPayment) {
  const created = payment.created_at ? new Date(payment.created_at) : new Date();
  const expiry = new Date(created);
  expiry.setFullYear(expiry.getFullYear() + 1);

  const today = new Date();

  let uiStatus: PackageStatus;
  const apiStatus = ((payment.status as any) || "").toString().toLowerCase();
  if (apiStatus === "active") uiStatus = "active";
  else if (apiStatus === "pending") uiStatus = "pending";
  else if (apiStatus === "rejected") uiStatus = "rejected";
  else uiStatus = "expired";

  let statusText = "";
  let helperText: string | undefined;

  if (uiStatus === "active") {
    const diffMs = expiry.getTime() - today.getTime();
    const daysRemaining = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
    statusText = "Active";
    helperText = `${daysRemaining} days remaining`;
  } else if (uiStatus === "pending") {
    statusText = "Pending";
    helperText = "Pending admin approval";
  } else if (uiStatus === "rejected") {
    statusText = "Rejected";
    helperText = "Rejected by admin";
  } else {
    statusText = "Expired";
    helperText = "Expired";
  }

  return {
    packageName: payment.package_name,
    memberName: payment.member_name,
    purchasedAt: created.toLocaleDateString("en-GB"),
    expiresAt: expiry.toLocaleDateString("en-GB"),
    status: uiStatus,
    statusText,
    helperText,
  };
}

function buildSearchIndex(payment: BusinessClubPayment) {
  const memberEmail =
    (payment as any).email ||
    (payment as any).member_email ||
    (payment as any).memberEmail ||
    "";

  const paymentNumber =
    (payment as any).sender_wallet_number ||
    (payment as any).senderWalletNumber ||
    "";

  const paymentMethod = (payment.payment_method || "").toString();

  return [payment.member_name, memberEmail, paymentMethod, paymentNumber]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold border transition",
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function PackageHistoryPage() {
  const { payments, loading, error } = useBusinessClubPayments();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // local override so UI updates instantly after approve/reject
  const [statusOverride, setStatusOverride] = useState<Record<number, string>>({});
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function updateStatus(id: number, status: "active" | "rejected") {
    setActionError(null);
    setUpdatingId(id);

    // optimistic update
    setStatusOverride((prev) => ({ ...prev, [id]: status }));

    try {
      const res = await fetch("/api/business-club-payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to update status");
      }
    } catch (e: any) {
      // rollback if failed
      setStatusOverride((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      setActionError(e?.message || "Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  }

  // apply override to payments
  const paymentsWithOverride = useMemo(() => {
    return (payments || []).map((p) => {
      const override = statusOverride[p.id as any];
      if (!override) return p;
      return { ...p, status: override } as any;
    });
  }, [payments, statusOverride]);

  const filteredPayments = useMemo(() => {
    const list = paymentsWithOverride || [];
    const q = query.trim().toLowerCase();

    return list.filter((p) => {
      const matchSearch = !q ? true : buildSearchIndex(p).includes(q);

      const apiStatus = ((p.status as any) || "").toString().toLowerCase();
      const matchStatus = statusFilter === "all" ? true : apiStatus === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [paymentsWithOverride, query, statusFilter]);

  const counts = useMemo(() => {
    const list = paymentsWithOverride || [];
    const c = { all: list.length, active: 0, pending: 0, rejected: 0 };
    for (const p of list) {
      const s = ((p.status as any) || "").toString().toLowerCase();
      if (s === "active") c.active++;
      else if (s === "pending") c.pending++;
      else if (s === "rejected") c.rejected++;
    }
    return c;
  }, [paymentsWithOverride]);

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header + Search */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">
              Package Purchase History
            </h1>
            <p className="text-sm text-slate-500">
              Search by <b>name</b>, <b>email</b> or <b>payment number</b>.
            </p>
          </div>

          <div className="w-full md:w-[420px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name / email / payment number..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-2.5 text-sm text-slate-800 shadow-sm outline-none focus:border-slate-300"
              />
              {query.trim() && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {(query.trim() || statusFilter !== "all") && (
              <p className="mt-2 text-xs text-slate-500">
                Showing {filteredPayments.length} of {paymentsWithOverride.length}
              </p>
            )}
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="mt-5 flex flex-wrap gap-2">
          <FilterButton
            label={`All (${counts.all})`}
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          />
          <FilterButton
            label={`Active (${counts.active})`}
            active={statusFilter === "active"}
            onClick={() => setStatusFilter("active")}
          />
          <FilterButton
            label={`Pending (${counts.pending})`}
            active={statusFilter === "pending"}
            onClick={() => setStatusFilter("pending")}
          />
          <FilterButton
            label={`Rejected (${counts.rejected})`}
            active={statusFilter === "rejected"}
            onClick={() => setStatusFilter("rejected")}
          />
        </div>

        {loading && <p className="mt-4 text-sm text-slate-500">Loading payments...</p>}
        {error && (
          <p className="mt-4 text-sm text-red-600">Failed to load payments: {error}</p>
        )}

        {actionError && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {actionError}
          </div>
        )}

        {/* Cards */}
        <div className="space-y-4 mt-6">
          {paymentsWithOverride.length === 0 && !loading && (
            <p className="text-sm text-slate-500">No payments found yet.</p>
          )}

          {paymentsWithOverride.length > 0 && filteredPayments.length === 0 && !loading && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
              No results found.
            </div>
          )}

          {filteredPayments.map((payment) => {
            const mapped = mapPaymentToUi(payment);
            const styles = getStatusStyles(mapped.status);

            const email =
              (payment as any).email ||
              (payment as any).member_email ||
              (payment as any).memberEmail ||
              "";

            const apiStatus = ((payment.status as any) || "").toString().toLowerCase();
            const isPending = apiStatus === "pending";
            const isUpdating = updatingId === (payment.id as any);

            return (
              <div
                key={payment.id}
                className={`rounded-xl border-l-8 ${styles.border} bg-white shadow-sm`}
              >
                <div className="flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
                  {/* Left */}
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-slate-800">
                      {mapped.packageName}
                    </h2>

                    <p className="text-sm text-slate-500">
                      Member: <span className="font-medium">{payment.member_name}</span>{" "}
                      ({payment.member_type})
                    </p>

                    {email && (
                      <p className="text-sm text-slate-500">
                        Email: <span className="font-medium">{email}</span>
                      </p>
                    )}

                    <div className="mt-2 text-sm text-slate-600 space-y-1">
                      <p>
                        <span className="font-medium">Purchased:</span> {mapped.purchasedAt}
                      </p>
                      <p>
                        <span className="font-medium">Expires:</span> {mapped.expiresAt}
                      </p>
                      <p>
                        <span className="font-medium">Amount:</span> {payment.package_price_text}
                      </p>
                      <p>
                        <span className="font-medium">Payment method:</span>{" "}
                        {payment.payment_method.toUpperCase()} ({payment.sender_wallet_number})
                      </p>
                      <p className="truncate">
                        <span className="font-medium">TRX ID:</span> {payment.trx_id}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles.badgeBg} ${styles.badgeText}`}
                    >
                      {mapped.statusText}
                    </span>

                    <div className={`flex items-center gap-1 text-sm ${styles.helperText}`}>
                      {mapped.status === "active" ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <span className={styles.iconText}>{getStatusIcon(mapped.status)}</span>
                      )}
                      <span>{mapped.helperText}</span>
                    </div>

                    {/*  STATUS CHANGE BUTTONS (ONLY IF PENDING) */}
                    {isPending && (
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => updateStatus(payment.id as any, "active")}
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                        >
                          {isUpdating ? "Updating..." : "Approve"}
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => updateStatus(payment.id as any, "rejected")}
                          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
                        >
                          {isUpdating ? "Updating..." : "Reject"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
