import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecentTransactions, RecentTransactions, RecentTransaction } from "../../lib/api";

const formatDate = (iso: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const getFlow = (tx: RecentTransaction) => {
    const dir = (tx.direction || "expense").toLowerCase();
    return dir === "income" ? "income" : "expense";
};

const formatAmount = (tx: RecentTransaction) => {
    const flow = getFlow(tx);
    const sign = flow === "income" ? "+" : "-";
    const value = Math.abs(tx.amount || 0);

    return `${sign}${value.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })} ${tx.currency || "TRY"}`;
};

export const RecentTransactionsCard: React.FC = () => {
    const { data, isLoading } = useQuery<RecentTransactions>({
        queryKey: ["recent-transactions"],
        queryFn: fetchRecentTransactions,
    });

    const transactions = data?.transactions ?? [];
    const top4 = transactions.slice(0, 4);

    return (
        <div
            className="
                w-full h-[293px]
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
                            textAlign: "right",
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
                            width: 60,
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
                            width: 70,
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
                            width: 90,
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
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="w-[660px] h-[53px] border border-[#F5F5F5] rounded-[6px] bg-[#F9FAFB] animate-pulse" />
                        ))}
                    </>
                )}

                {!isLoading &&
                    top4.map((tx) => (
                        <div key={tx.id} className="w-[660px] h-[53px] border border-[#F5F5F5] rounded-[6px] flex flex-col">
                            <div className="w-[633px] h-[40px] flex items-center justify-between mx-[13.5px] mt-[6px]">
                                <div className="w-[260px] h-[40px] flex items-center gap-[14px]">
                                    <div className="w-[40px] h-[40px] rounded-[10px] bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
                                        <img src={tx.image} alt={tx.name} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="flex flex-col gap-[2px]">
                                        <span
                                            className="text-[14px]"
                                            style={{
                                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                fontWeight: 500,
                                                color: "#1B212D",
                                            }}
                                        >
                                            {tx.name}
                                        </span>
                                        <span
                                            className="text-[12px]"
                                            style={{
                                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                fontWeight: 400,
                                                color: "#929EAE",
                                            }}
                                        >
                                            {tx.business}
                                        </span>
                                    </div>
                                </div>

                                <span
                                    className="text-[14px]"
                                    style={{
                                        width: 90,
                                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                        fontWeight: 500,
                                        color: "#929EAE",
                                        textAlign: "center",
                                    }}
                                >
                                    {tx.type}
                                </span>

                                <span
                                    className="text-[14px]"
                                    style={{
                                        width: 90,
                                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                        fontWeight: 600,
                                        color: getFlow(tx) === "income" ? "#16A34A" : "#1B212D",
                                        textAlign: "center",
                                    }}
                                >
                                    {formatAmount(tx)}
                                </span>

                                <span
                                    className="text-[14px]"
                                    style={{
                                        width: 100,
                                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                        fontWeight: 500,
                                        color: "#929EAE",
                                        textAlign: "center",
                                    }}
                                >
                                    {formatDate(tx.date)}
                                </span>
                            </div>
                        </div>
                    ))}

                {!isLoading && top4.length === 0 && <div className="text-[12px] text-[#9CA3AF] mt-2">No recent transactions.</div>}
            </div>
        </div>
    );
};
