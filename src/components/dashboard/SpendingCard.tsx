export const BalanceCard = ({ icon, title, amount, dark }: any) => {
    return (
        <div className={`w-[222px] h-[105px] rounded-[10px] flex items-center gap-[15px] pt-[24px] pr-[20px] pb-[24px] pl-[20px] ${dark ? "bg-[#363A3F]" : "bg-[#F8F8F8]"}`}>
            <img src={`/icons/${icon}.png`} className="w-[42px] h-[42px]" />
            <div className="flex flex-col justify-between">
                <span className="text-[14px] text-[#929EAE]">{title}</span>
                <span className={`text-[24px] font-bold ${dark ? "text-white" : "text-[#1B212D]"}`}>{amount}</span>
            </div>
        </div>
    );
};
