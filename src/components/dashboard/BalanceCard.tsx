export const BalanceCard = ({ icon, title, amount, dark }: any) => {
    const amountText = String(amount ?? "");

    const isLong = amountText.length > 14;

    return (
        <div
            className={`w-[222px] h-[105px] rounded-[10px] flex items-center gap-[15px]
            pt-[24px] pr-[20px] pb-[24px] pl-[20px]
            ${dark ? "bg-[#363A3F]" : "bg-[#F8F8F8]"}`}
        >
            <div
                className={`w-[42px] h-[42px] rounded-full flex items-center justify-center
                ${dark ? "bg-[#272A2E]" : "bg-[#EFEFEF]"}`}
            >
                <img src={`/icons/${icon}.png`} className="w-[20px] h-[20px]" />
            </div>

            <div className="flex flex-col justify-between max-w-[140px]">
                <span
                    style={{
                        fontFamily: '"Kumbh Sans", sans-serif',
                        fontSize: "13px",
                        lineHeight: "16px",
                        color: dark ? "#C5CFDD" : "#929EAE",
                    }}
                >
                    {title}
                </span>

                <span
                    className={`${dark ? "text-white" : "text-[#1B212D]"} font-bold 
                    whitespace-nowrap overflow-hidden text-ellipsis`}
                    style={{
                        fontFamily: '"Kumbh Sans", sans-serif',
                        fontSize: isLong ? "16px" : "18px",
                        lineHeight: "22px",
                    }}
                >
                    {amount}
                </span>
            </div>
        </div>
    );
};
