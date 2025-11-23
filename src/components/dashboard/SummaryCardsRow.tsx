import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardSummary, FinancialSummary } from "../../lib/api";

const formatAmount = (amount?: number, currency?: string) => {
    if (typeof amount !== "number") return "--";
    const curr = currency || "USD";

    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: curr,
        }).format(amount);
    } catch {
        return `${amount.toLocaleString("en-US")} ${curr}`;
    }
};

export const SummaryCardsRow: React.FC = () => {
    const { data, isLoading, isError } = useQuery<FinancialSummary>({
        queryKey: ["financial-summary"],
        queryFn: fetchDashboardSummary,
    });

    const totalBalance = data?.totalBalance;
    const totalExpense = data?.totalExpense;
    const totalSavings = data?.totalSavings;

    if (isLoading) {
        return (
            <div className="w-[716px] h-[105px] flex gap-[25px]">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-[222px] h-[105px] rounded-[10px] bg-[#F3F4F6] animate-pulse" />
                ))}
            </div>
        );
    }

    const showError = isError || !data;

    return (
        <div className="w-[716px] h-[105px] flex gap-[25px]">
            <div
                className="
                    w-[222px] h-[105px]
                    rounded-[10px]
                    bg-[#363A3F]
                    flex items-center
                    gap-[15px]
                    pt-[24px] pr-[20px] pb-[24px] pl-[20px]
                "
            >
                <img src="/icons/balance.png" alt="Total balance" className="w-[42px] h-[42px] object-contain" />
                <div className="flex flex-col justify-between" style={{ width: 125, height: 57, gap: 10 }}>
                    <span
                        className="text-[14px] font-normal leading-[1]"
                        style={{
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            color: "#929EAE",
                            height: 17,
                        }}
                    >
                        Total balance
                    </span>
                    <span
                        className="text-[24px] font-bold leading-[1]"
                        style={{
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            color: "#FFFFFF",
                            height: 30,
                        }}
                    >
                        {formatAmount(totalBalance?.amount, totalBalance?.currency)}
                    </span>
                    {showError && <span className="text-[11px] text-red-400 leading-none">summary error</span>}
                </div>
            </div>

            <div
                className="
                    w-[222px] h-[105px]
                    rounded-[10px]
                    bg-[#F8F8F8]
                    flex items-center
                    gap-[15px]
                    pt-[24px] pr-[20px] pb-[24px] pl-[20px]
                "
            >
                <img src="/icons/spending.png" alt="Total spending" className="w-[42px] h-[42px] object-contain" />
                <div className="flex flex-col justify-between" style={{ width: 125, height: 57, gap: 10 }}>
                    <span
                        className="text-[14px] font-normal leading-[1]"
                        style={{
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            color: "#929EAE",
                            height: 17,
                        }}
                    >
                        Total spending
                    </span>
                    <span
                        className="text-[24px] font-bold leading-[1]"
                        style={{
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            color: "#1B212D",
                            height: 30,
                        }}
                    >
                        {formatAmount(totalExpense?.amount, totalExpense?.currency)}
                    </span>
                    {showError && <span className="text-[11px] text-red-400 leading-none">summary error</span>}
                </div>
            </div>

            <div
                className="
                    w-[222px] h-[105px]
                    rounded-[10px]
                    bg-[#F8F8F8]
                    flex items-center
                    gap-[15px]
                    pt-[24px] pr-[20px] pb-[24px] pl-[20px]
                "
            >
                <img src="/icons/saved.png" alt="Total saved" className="w-[42px] h-[42px] object-contain" />
                <div className="flex flex-col justify-between" style={{ width: 125, height: 57, gap: 10 }}>
                    <span
                        className="text-[14px] font-normal leading-[1]"
                        style={{
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            color: "#929EAE",
                            height: 17,
                        }}
                    >
                        Total saved
                    </span>
                    <span
                        className="text-[24px] font-bold leading-[1]"
                        style={{
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            color: "#1B212D",
                            height: 30,
                        }}
                    >
                        {formatAmount(totalSavings?.amount, totalSavings?.currency)}
                    </span>
                    {showError && <span className="text-[11px] text-red-400 leading-none">summary error</span>}
                </div>
            </div>
        </div>
    );
};
