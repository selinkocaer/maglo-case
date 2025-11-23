import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchScheduledTransfers, ScheduledTransfers, ScheduledTransfer } from "../../lib/api";

const getInitials = (text?: string | null): string => {
    if (!text) return "U";
    return text
        .split(" ")
        .filter(Boolean)
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

const formatDateTime = (iso: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";

    return d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatAmount = (t: ScheduledTransfer) => {
    const value = Math.abs(t.amount ?? 0);
    const currency = t.currency || "$";
    const formatted = value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return `-${formatted} ${currency}`;
};

export const ScheduledTransfersSection: React.FC = () => {
    const { data, isLoading } = useQuery<ScheduledTransfers>({
        queryKey: ["scheduled-transfers"],
        queryFn: fetchScheduledTransfers,
    });

    const transfers = data?.transfers ?? [];
    const visibleTransfers = transfers.slice(0, 5);

    return (
        <div
            className="
                w-[354px]
                rounded-[10px]
                bg-[#FFFFFF]
                border border-[#F5F5F5]
                pt-[20px] pr-[19px] pb-[16px] pl-[24px]
                flex flex-col gap-[16px]
            "
        >
            <div className="w-full flex items-center justify-between">
                <h3
                    className="text-[18px] font-semibold leading-[1]"
                    style={{
                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                        color: "#1B212D",
                    }}
                >
                    Scheduled Transfers
                </h3>

                <button className="w-[22px] h-[22px] flex items-center justify-center">
                    <img src="/icons/more.png" className="w-[22px] h-[22px]" />
                </button>
            </div>

            <div className="flex flex-col gap-[10px]">
                {isLoading && (
                    <>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="w-full h-[52px] rounded-[8px] bg-[#F5F5F5] animate-pulse" />
                        ))}
                    </>
                )}

                {!isLoading && visibleTransfers.length === 0 && <div className="text-[12px] text-[#9CA3AF]">No scheduled transfers.</div>}

                {!isLoading &&
                    visibleTransfers.map((tr) => {
                        const name = tr.to || tr.from || "Unknown";
                        const initials = getInitials(name);

                        return (
                            <div key={tr.id} className="w-full h-[60px] rounded-[8px] bg-[#FFFFFF] border border-[#F5F5F5] flex items-center justify-between px-[10px]">
                                <div className="flex items-center gap-[10px]">
                                    <div className="w-[32px] h-[32px] rounded-full bg-[#F3F4F6] flex items-center justify-center">
                                        <span
                                            className="text-[12px] font-semibold"
                                            style={{
                                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                color: "#111827",
                                            }}
                                        >
                                            {initials}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-[2px]">
                                        <span
                                            className="text-[14px]"
                                            style={{
                                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                fontWeight: 500,
                                                color: "#111827",
                                            }}
                                        >
                                            {name}
                                        </span>
                                        <span
                                            className="text-[11px]"
                                            style={{
                                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                color: "#9CA3AF",
                                            }}
                                        >
                                            {formatDateTime(tr.date)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-[2px]">
                                    <span
                                        className="text-[14px]"
                                        style={{
                                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                            fontWeight: 600,
                                            color: "#1B212D",
                                        }}
                                    >
                                        {formatAmount(tr)}
                                    </span>
                                    <span
                                        className="text-[11px]"
                                        style={{
                                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                            color: "#9CA3AF",
                                        }}
                                    >
                                        {tr.status || "scheduled"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
