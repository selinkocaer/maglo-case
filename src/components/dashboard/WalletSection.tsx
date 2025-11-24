import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWallet, Wallet } from "../../lib/api";

type WalletCard = Wallet["cards"][number];

const getBalanceNumber = (card?: WalletCard): number => {
    if (!card) return 0;

    const anyCard = card as any;
    if (typeof card.balance === "number") return card.balance;
    if (typeof anyCard.availableBalance === "number") return anyCard.availableBalance;
    if (typeof anyCard.amount === "number") return anyCard.amount;

    return 0;
};

const getCurrency = (card?: WalletCard): string => {
    if (!card) return "TRY";
    const anyCard = card as any;
    return card.currency || anyCard.curr || "TRY";
};

const getLast4 = (card?: WalletCard): string => {
    if (!card) return "0000";
    const digits = (card.cardNumber || "").replace(/\D/g, "");
    const last4 = digits.slice(-4);
    return last4 || "0000";
};

const getExpiry = (card?: WalletCard): string => {
    if (!card) return "--/--";
    const mm = String(card.expiryMonth ?? "").padStart(2, "0");
    const yy = card.expiryYear ? String(card.expiryYear).slice(-2) : "--";
    return `${mm}/${yy}`;
};

export const WalletSection: React.FC = () => {
    const { data, isLoading } = useQuery<Wallet>({
        queryKey: ["wallet"],
        queryFn: fetchWallet,
    });

    const cards = data?.cards ?? [];
    const card1 = cards[0];
    const card2 = cards[1];

    const card1Balance = getBalanceNumber(card1);
    const card1Currency = getCurrency(card1);

    const card2Balance = getBalanceNumber(card2);
    const card2Currency = getCurrency(card2);

    return (
        <div className="w-[354px] h-[359px] flex flex-col">
            <div className="w-[354px] h-[22px] flex items-center justify-between mb-[15px]">
                <h2
                    className="text-[18px] font-semibold leading-[1]"
                    style={{
                        width: 55,
                        height: 22,
                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                        color: "#1B212D",
                    }}
                >
                    Wallet
                </h2>

                <button className="w-[22px] h-[22px]">
                    <img src="/icons/more.png" className="w-[22px] h-[22px]" />
                </button>
            </div>

            <div className="w-[354px] h-[359px] relative">
                {isLoading && <div className="absolute left-0 top-[37px] w-[354px] h-[210px] rounded-[15px] bg-[#E5E7EB] animate-pulse" />}

                {card1 && (
                    <>
                        <div
                            className="absolute left-0 top-[37px] w-[354px] h-[210px] rounded-[15px]"
                            style={{
                                background: "linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)",
                            }}
                        />

                        <div className="absolute left-0 top-[37px] w-[354px] h-[210px] rounded-[15px] px-[30px] pt-[55px] pb-[32px]">
                            <div className="w-[293px] h-[80px] flex justify-between">
                                <div className="w-[200px] h-[80px] flex flex-col gap-[8px]">
                                    <span
                                        style={{
                                            width: 58,
                                            height: 23,
                                            fontFamily: "Gordita",
                                            fontWeight: 700,
                                            fontSize: 16,
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        Maglo.
                                    </span>

                                    <div className="flex items-center gap-[10px]">
                                        <div className="w-[37.92px] h-[30px] bg-[#3A3A39] rounded-[8px] flex items-center justify-center">
                                            <img src="/icons/chip.png" className="w-[24px] h-[18px]" />
                                        </div>
                                        <div className="w-[1px] h-[20px] bg-[#626261]" />
                                        <span
                                            style={{
                                                fontFamily: "Gordita",
                                                fontWeight: 500,
                                                fontSize: 12,
                                                color: "#626260",
                                            }}
                                        >
                                            {card1.bank} • {card1.type}
                                        </span>
                                    </div>
                                </div>

                                <img src="/icons/wifi2.png" className="w-[33px] h-[34px] -rotate-90" />
                            </div>

                            <div className="w-full flex justify-between items-end mt-[18px]">
                                <div className="flex flex-col gap-[6px]">
                                    <span
                                        style={{
                                            fontFamily: "Gordita",
                                            fontWeight: 700,
                                            fontSize: 17,
                                            letterSpacing: "0.10em",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        **** **** **** {getLast4(card1)}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Gordita",
                                            fontWeight: 500,
                                            fontSize: 14,
                                            letterSpacing: "0.02em",
                                            color: "#868685",
                                        }}
                                    >
                                        Exp: {getExpiry(card1)}
                                    </span>
                                </div>

                                <div className="flex flex-col items-end gap-[4px]">
                                    <span
                                        style={{
                                            fontFamily: "Gordita",
                                            fontWeight: 700,
                                            fontSize: 16,
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {card1Balance.toLocaleString("tr-TR")} {card1Currency}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Gordita",
                                            fontWeight: 500,
                                            fontSize: 12,
                                            color: "#868685",
                                        }}
                                    >
                                        Available balance
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {card2 && (
                    <>
                        <div
                            className="absolute left-[15px] top-[187px] w-[324px] h-[172px] rounded-[15px]"
                            style={{
                                opacity: 0.1,
                                background: "linear-gradient(131.66deg, #959595 -12.2%, #324000 147.88%)",
                            }}
                        />

                        <div
                            className="absolute left-[15px] top-[187px] w-[324px] h-[172px] rounded-[15px] px-[20px] pt-[20px] pb-[20px]"
                            style={{
                                borderWidth: 0.5,
                                borderStyle: "solid",
                                borderRadius: "15px",
                                borderImageSlice: 1,
                                borderImageSource: "linear-gradient(114.49deg, rgba(255, 255, 255, 0.4) -41.08%, rgba(255, 255, 255, 0.1) 104.09%)",
                                backdropFilter: "blur(10px)",
                                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)",
                            }}
                        >
                            <div className="w-[290px] h-[68px] flex justify-between">
                                <div className="w-[183px] h-[60px] flex flex-col gap-[6px]">
                                    <span
                                        style={{
                                            fontFamily: "Gordita",
                                            fontWeight: 700,
                                            fontSize: 16,
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        Maglo.
                                    </span>

                                    <div className="flex items-center gap-[10px]">
                                        <div className="w-[30px] h-[24px]">
                                            <img src="/icons/chip.png" className="w-full h-full" />
                                        </div>
                                        <div className="w-[1px] h-[20px] bg-[#929EAE]" />
                                        <span
                                            style={{
                                                fontFamily: "Gordita",
                                                fontWeight: 500,
                                                fontSize: 12,
                                                color: "#F5F5F5",
                                            }}
                                        >
                                            {card2.bank} • {card2.type}
                                        </span>
                                    </div>
                                </div>

                                <img src="/icons/wifi2.png" className="w-[33px] h-[34px] -rotate-90" />
                            </div>

                            <div className="mt-[10px]">
                                <span
                                    style={{
                                        fontFamily: "Gordita",
                                        fontWeight: 700,
                                        fontSize: 16,
                                        letterSpacing: "0.10em",
                                        color: "#1B212D",
                                    }}
                                >
                                    **** **** **** {getLast4(card2)}
                                </span>
                            </div>

                            <div className="mt-[10px] flex justify-between items-center">
                                <span
                                    style={{
                                        fontFamily: "Gordita",
                                        fontWeight: 500,
                                        fontSize: 12,
                                        letterSpacing: "0.02em",
                                        color: "#929EAE",
                                    }}
                                >
                                    Exp: {getExpiry(card2)}
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Gordita",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        color: "#111827",
                                    }}
                                >
                                    {card2Balance.toLocaleString("tr-TR")} {card2Currency}
                                </span>
                            </div>
                        </div>
                    </>
                )}

                {!isLoading && cards.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-[12px] text-[#9CA3AF]">No cards found.</div>}
            </div>
        </div>
    );
};
