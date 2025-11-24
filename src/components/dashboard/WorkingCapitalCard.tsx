import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkingCapital, WorkingCapital } from "../../lib/api";

export const WorkingCapitalCard: React.FC = () => {
    const { data, isLoading } = useQuery<WorkingCapital>({
        queryKey: ["working-capital"],
        queryFn: fetchWorkingCapital,
    });

    const currency = data?.currency ?? "TRY";
    const summary = data?.summary;
    const points = data?.data ?? [];

    const incomeText = summary ? `${summary.totalIncome.toLocaleString("tr-TR")} ${currency}` : "--";

    const expenseText = summary ? `${summary.totalExpense.toLocaleString("tr-TR")} ${currency}` : "--";

    const netText = summary ? `${summary.netBalance.toLocaleString("tr-TR")} ${currency}` : "--";

    const monthLabels = points.slice(0, 7).map((p) => p.month);

    return (
        <div className="w-[716px] h-[291px] rounded-[10px] bg-[#FFFFFF] border border-[#F5F5F5] flex flex-col relative">
            <div className="mt-[15px] ml-[25px] mr-[20px] w-[671px] h-[30px] flex items-center justify-between">
                <div className="flex flex-col">
                    <h2
                        className="text-[18px] font-semibold leading-[1] text-[#1B212D]"
                        style={{
                            width: 138,
                            height: 22,
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                        }}
                    >
                        Working Capital
                    </h2>

                    <div className="flex gap-4 mt-[4px] text-[10px] text-[#929EAE]">
                        <span
                            style={{
                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            }}
                        >
                            Assets: {incomeText}
                        </span>
                        <span
                            style={{
                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            }}
                        >
                            Liabilities: {expenseText}
                        </span>
                        <span
                            style={{
                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            }}
                        >
                            WC: {netText}
                        </span>
                    </div>
                </div>

                <div className="w-[338px] h-[30px] flex items-center justify-between">
                    <div className="w-[159px] h-[15px] flex items-center justify-between">
                        <div className="w-[59px] h-[15px] flex items-center">
                            <span className="w-[8px] h-[8px] rounded-full bg-[#29A073]" />
                            <span
                                className="ml-[8px] text-[12px] leading-[1]"
                                style={{
                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                    color: "#1B212D",
                                }}
                            >
                                Income
                            </span>
                        </div>

                        <div className="w-[70px] h-[15px] flex items-center">
                            <span className="w-[8px] h-[8px] rounded-full bg-[#C8EE44]" />
                            <span
                                className="ml-[8px] text-[12px] leading-[1]"
                                style={{
                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                    color: "#1B212D",
                                }}
                            >
                                Expenses
                            </span>
                        </div>
                    </div>

                    <button
                        className="
                            w-[107px] h-[30px]
                            rounded-[5px]
                            bg-[#F8F8F8]
                            flex items-center justify-between
                            pl-[10px] pr-[8px] py-[6px]
                        "
                    >
                        <span
                            className="text-[12px] leading-[1]"
                            style={{
                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                color: "#1B212D",
                            }}
                        >
                            {data?.period === "last6Months" ? "last6Months" : "Last period"}
                        </span>
                        <img src="/icons/ok.png" alt="Open" className="w-[18px] h-[18px] object-contain" />
                    </button>
                </div>
            </div>

            <div className="absolute left-[25px] top-[90px] w-[20px] h-[171px] flex flex-col justify-between">
                {["10K", "7K", "5K", "3K", "0K"].map((label) => (
                    <span
                        key={label}
                        className="text-[12px] leading-[1] text-[#929EAE]"
                        style={{
                            width: "16px",
                            height: "15px",
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            fontWeight: 400,
                        }}
                    >
                        {label}
                    </span>
                ))}
            </div>

            <div className="flex-1 mt-[20px] mr-[25px] mb-[20px] ml-[60px] rounded-[14px] bg-[#FDFDFD] border border-dashed border-[#F3F4F6] relative overflow-hidden">
                {isLoading && <div className="absolute inset-0 bg-white/60 flex items-center justify-center text-[12px] text-[#9CA3AF]">Loading working capital...</div>}

                <img src="/icons/vektor1.png" alt="Expenses line" className="absolute left-[0px] top-[12px] w-[617px] h-[110px] object-contain pointer-events-none" />
                <img src="/icons/vektor2.png" alt="Income line" className="absolute left-[0px] top-[12px] w-[618px] h-[109px] object-contain pointer-events-none" />

                <div
                    className="absolute w-[49px] h-[164px] rounded-[12px]"
                    style={{
                        left: "244px",
                        top: "32px",
                        background: "linear-gradient(180deg, rgba(250, 251, 254, 0) 0%, #F2F6FC 66.56%)",
                    }}
                />

                {summary && (
                    <div className="absolute left-[280px] top-[0px] w-[70px] h-[70px] flex flex-col items-center gap-[16px]">
                        <div className="w-[70px] h-[36px] rounded-[6px] bg-[#F3F6F8] flex items-center justify-center">
                            <span
                                className="text-[12px] leading-[1]"
                                style={{
                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                    fontWeight: 500,
                                    color: "#1B212D",
                                }}
                            >
                                {summary.netBalance.toLocaleString("tr-TR")}
                            </span>
                        </div>
                        <img src="/icons/pointer.png" alt="pointer" className="w-[12px] h-[12px]" />
                    </div>
                )}

                <div className="absolute left-[11px] top-[35px] w-[621px] h-[193px] flex flex-col gap-[14px] pointer-events-none">
                    <div className="w-[588px] h-[164px] flex justify-between">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-full border-l"
                                style={{
                                    borderColor: "#FFF4FE",
                                    opacity: 1,
                                }}
                            />
                        ))}
                    </div>

                    <div className="w-[621px] h-[15px] flex justify-between">
                        {(monthLabels.length > 0 ? monthLabels : ["Apr 14", "Apr 15", "Apr 16", "Apr 17", "Apr 18", "Apr 19", "Apr 20"]).map((label) => (
                            <span
                                key={label}
                                className="text-[12px] leading-[1]"
                                style={{
                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                    color: "#929EAE",
                                    height: 15,
                                }}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
