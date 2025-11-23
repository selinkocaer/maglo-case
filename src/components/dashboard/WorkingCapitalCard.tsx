import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkingCapital, WorkingCapital } from "../../lib/api";

const formatNumber = (value?: number) => {
    if (typeof value !== "number") return "--";
    return value.toLocaleString("en-US");
};

export const WorkingCapitalCard: React.FC = () => {
    const { data, isLoading, isError } = useQuery<WorkingCapital>({
        queryKey: ["working-capital"],
        queryFn: fetchWorkingCapital,
    });

    const periodLabel = data?.period || "Last 7 days";
    const summary = data?.summary;

    const workingCapital = formatNumber(summary?.workingCapital);
    const assets = formatNumber(summary?.currentAssets);
    const liabilities = formatNumber(summary?.currentLiabilities);

    return (
        <div className="w-[716px] h-[291px] rounded-[10px] bg-[#FFFFFF] border border-[#F5F5F5] flex flex-col relative">
            <div className="mt-[15px] ml-[25px] mr-[20px] w-[671px] h-[30px] flex items-center justify-between">
                <h2
                    className="text-[18px] font-semibold leading-[1] text-[#1B212D]"
                    style={{
                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                    }}
                >
                    Working Capital
                </h2>

                <div className="w-[338px] h-[30px] flex items-center justify-between">
                    <div className="flex flex-col text-[11px] text-[#6B7280] leading-[1.1]">
                        <span>
                            Assets: <strong>{assets}</strong>
                        </span>
                        <span>
                            Liabilities: <strong>{liabilities}</strong>
                        </span>
                        <span>
                            WC: <strong>{workingCapital}</strong>
                        </span>
                        {isError && <span className="text-red-400 mt-[2px]">working capital error</span>}
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
                            {periodLabel}
                        </span>
                        <img src="/icons/ok.png" alt="Open" className="w-[18px] h-[18px] object-contain" />
                    </button>
                </div>
            </div>

            <div className="absolute left-[25px] top-[70px] w-[20px] h-[171px] flex flex-col justify-between">
                {["10K", "7K", "5K", "3K", "0K"].map((label) => (
                    <span
                        key={label}
                        className="text-[12px] leading-[1] text-[#929EAE]"
                        style={{
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                        }}
                    >
                        {label}
                    </span>
                ))}
            </div>

            <div className="flex-1 mt-[20px] mr-[25px] mb-[20px] ml-[60px] rounded-[14px] bg-[#FDFDFD] border border-dashed border-[#F3F4F6] relative overflow-hidden">
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

                <div className="absolute left-[280px] top-[0px] w-[57px] h-[70px] flex flex-col items-center gap-[16px]">
                    <div className="w-[80px] h-[36px] rounded-[6px] bg-[#F3F6F8] flex items-center justify-center px-[4px]">
                        <span
                            className="text-[12px] leading-[1]"
                            style={{
                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                fontWeight: 500,
                                color: "#1B212D",
                            }}
                        >
                            {workingCapital === "--" ? "--" : `${workingCapital}`}
                        </span>
                    </div>
                    <img src="/icons/pointer.png" alt="pointer" className="w-[12px] h-[12px]" />
                </div>

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
                        {["Apr 14", "Apr 15", "Apr 16", "Apr 17", "Apr 18", "Apr 19", "Apr 20"].map((d) => (
                            <span
                                key={d}
                                className="text-[12px] leading-[1]"
                                style={{
                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                    color: "#929EAE",
                                }}
                            >
                                {d}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {isLoading && <span className="absolute bottom-[8px] left-[25px] text-[11px] text-[#9CA3AF]">Loading working capital...</span>}
        </div>
    );
};
