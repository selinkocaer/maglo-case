import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchScheduledTransfers, ScheduledTransfers, ScheduledTransfer } from "../../lib/api";

const formatDate = (iso: string) => {
    if (!iso) return "-";
    const d = new Date(iso);

    return (
        d.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }) +
        " " +
        d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
    );
};

const formatAmount = (amount: number, currency: string) => {
    return `${amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })} ${currency}`;
};

export const ScheduledTransfersSection: React.FC = () => {
    const { data, isLoading } = useQuery<ScheduledTransfers>({
        queryKey: ["scheduled-transfers"],
        queryFn: fetchScheduledTransfers,
    });

    const transfers = data?.transfers ?? [];

    return (
        <div
            className="
                w-full rounded-[10px]
                bg-white 
                border border-[#F5F5F5]
                px-[20px] pt-[20px] pb-[14px]
                flex flex-col gap-[20px]
                font-sans
            "
        >
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h3 className="text-[18px] font-semibold text-[#1B212D] leading-none">Scheduled Transfers</h3>

                <button>
                    <img src="/icons/more.png" className="w-[18px] h-[18px]" />
                </button>
            </div>

            {/* LIST */}
            <div className="flex flex-col gap-[12px]">
                {isLoading && Array.from({ length: 5 }).map((_, i) => <div key={i} className="w-full h-[60px] bg-[#F3F4F6] rounded-[8px] animate-pulse" />)}

                {!isLoading &&
                    transfers.map((t: ScheduledTransfer) => (
                        <div
                            key={t.id}
                            className="
                                w-full h-[60px]
                                border border-[#F5F5F5]
                                rounded-[8px]
                                px-[12px]
                                flex justify-between items-center
                            "
                        >
                            <div className="flex items-center gap-[12px]">
                                <div className="w-[40px] h-[40px] rounded-full bg-[#F3F4F6] overflow-hidden flex-shrink-0">
                                    <img src={t.image} className="w-full h-full object-cover" alt={t.name} />
                                </div>

                                <div className="flex flex-col leading-tight">
                                    <span className="text-[14px] font-semibold text-[#1B212D]">{t.name}</span>
                                    <span className="text-[12px] text-[#929EAE] mt-[2px]">{formatDate(t.date)}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end leading-tight">
                                <span className="text-[14px] font-semibold text-[#1B212D]">{formatAmount(t.amount, t.currency)}</span>
                                <span className="text-[11px] text-[#29A073] mt-[2px]">{t.status}</span>
                            </div>
                        </div>
                    ))}

                {!isLoading && transfers.length === 0 && <div className="text-[#9CA3AF] text-[12px] mt-2">No scheduled transfers.</div>}
            </div>
        </div>
    );
};
