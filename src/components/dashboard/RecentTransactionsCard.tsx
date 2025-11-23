import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecentTransactions, RecentTransactions, RecentTransaction } from "../../lib/api";

const formatDate = (iso: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";

    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

const formatAmount = (tx: RecentTransaction) => {
    const sign = tx.type === "income" ? "+" : "-";
    const currency = tx.currency || "TRY";
    const value = Math.abs(tx.amount ?? 0);

    const formatted = value.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return `${sign}${currency} ${formatted}`;
};

const getTxIcon = (tx: RecentTransaction): string => {
    const desc = tx.description?.toLowerCase() || "";

    if (desc.includes("iphone")) return "/icons/iphone.png";
    if (desc.includes("netflix")) return "/icons/netflix.png";
    if (desc.includes("figma")) return "/icons/figma.png";

    // fallback – sidebar’daki transactions ikonunu kullan
    return "/icons/transactions.png";
};

export const RecentTransactionsCard: React.FC = () => {
    const { data, isLoading } = useQuery<RecentTransactions>({
        queryKey: ["recent-transactions"],
        queryFn: fetchRecentTransactions,
    });

    const transactions = data?.transactions ?? [];

    const visibleTx = transactions.slice(0, 3);

    return (
        <div
            className="
                w-[717px] h-[293px]
                rounded-[10px]
                bg-[#FFFFFF]
                border border-[#F5F5F5]
                pt-[20px] pr-[19px] pb-[20px] pl-[25px]
                flex flex-col gap-[20px]
            "
        >
            <div className="w-[673px] h-[22px] flex items-center justify-between">
                <h3
                    className="text-[18px] font-semibold leading-[1]"
                    style={{
                        width: 163,
                        height: 22,
                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                        color: "#1B212D",
                    }}
                >
                    Recent Transaction
                </h3>

                <button className="w-[79px] h-[18px] flex items-center justify-between">
                    <span
                        className="text-[14px] leading-[1]"
                        style={{
                            width: 55,
                            height: 17,
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            fontWeight: 600,
                            color: "#29A073",
                            textAlign: "right" as const,
                        }}
                    >
                        View All
                    </span>
                    <img src="/icons/right.png" alt="View all" className="w-[18px] h-[18px]" />
                </button>
            </div>

            <div className="w-[610px] h-[15px] flex items-center justify-between">
                <span
                    className="text-[12px] leading-[1]"
                    style={{
                        width: 120,
                        height: 15,
                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                        fontWeight: 600,
                        color: "#929EAE",
                    }}
                >
                    NAME / BUSINESS
                </span>
                <div className="w-[343px] h-[15px] flex items-center justify-between">
                    <span
                        className="text-[12px] leading-[1]"
                        style={{
                            width: 31,
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            fontWeight: 600,
                            color: "#929EAE",
                        }}
                    >
                        TYPE
                    </span>
                    <span
                        className="text-[12px] leading-[1]"
                        style={{
                            width: 56,
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            fontWeight: 600,
                            color: "#929EAE",
                        }}
                    >
                        AMOUNT
                    </span>
                    <span
                        className="text-[12px] leading-[1]"
                        style={{
                            width: 32,
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            fontWeight: 600,
                            color: "#929EAE",
                        }}
                    >
                        DATE
                    </span>
                </div>
            </div>

            <div className="w-[660px] h-[176px] flex flex-col gap-[15px] mt-[8px]">
                {isLoading && (
                    <>
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="w-[660px] h-[53px] rounded-[6px] bg-[#F5F5F5] animate-pulse" />
                        ))}
                    </>
                )}

                {!isLoading && visibleTx.length === 0 && <div className="text-[12px] text-[#9CA3AF] flex items-center">No recent transactions.</div>}

                {!isLoading &&
                    visibleTx.map((tx) => (
                        <div key={tx.id} className="w-[660px] h-[53px] border border-[#F5F5F5] rounded-[6px] flex flex-col">
                            <div className="w-[633px] h-[40px] flex items-center justify-between mx-[13.5px] mt-[6px]">
                                <div className="w-[230px] h-[40px] flex items-center gap-[14px]">
                                    <img src={getTxIcon(tx)} className="w-[40px] h-[40px]" alt="tx icon" />
                                    <div className="flex flex-col gap-[2px]">
                                        <span
                                            className="text-[14px]"
                                            style={{
                                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                fontWeight: 500,
                                                color: "#1B212D",
                                            }}
                                        >
                                            {tx.description || "Transaction"}
                                        </span>
                                        <span
                                            className="text-[12px]"
                                            style={{
                                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                fontWeight: 400,
                                                color: "#929EAE",
                                            }}
                                        >
                                            {tx.currency || "TRY"}
                                        </span>
                                    </div>
                                </div>

                                <span
                                    className="text-[14px]"
                                    style={{
                                        width: 70,
                                        height: 17,
                                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                        fontWeight: 500,
                                        color: "#929EAE",
                                        textAlign: "center" as const,
                                    }}
                                >
                                    {tx.type === "income" ? "Income" : "Expense"}
                                </span>

                                <span
                                    className="text-[14px]"
                                    style={{
                                        width: 110,
                                        height: 17,
                                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                        fontWeight: 600,
                                        color: tx.type === "income" ? "#16A34A" : "#1B212D",
                                        textAlign: "center" as const,
                                    }}
                                >
                                    {formatAmount(tx)}
                                </span>

                                <span
                                    className="text-[14px]"
                                    style={{
                                        width: 90,
                                        height: 17,
                                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                        fontWeight: 500,
                                        color: "#929EAE",
                                        textAlign: "center" as const,
                                    }}
                                >
                                    {formatDate(tx.date)}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
