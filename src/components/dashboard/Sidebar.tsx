import React from "react";

export const Sidebar: React.FC = () => {
    return (
        <aside
            className="
                w-[250px]
                min-h-screen
                bg-[#FAFAFA]
                flex flex-col
                pt-[30px] pr-[25px] pb-[100px] pl-[25px]
                gap-[40px]
            "
        >
            <div className="w-[122px] h-[30px]">
                <img src="/logo.png" alt="Maglo logo" className="w-[122px] h-[30px] object-contain" />
            </div>

            <nav className="w-[200px] h-[248px] flex flex-col gap-[2px]">
                <button
                    className="
                        w-[200px] h-[48px]
                        rounded-[8px]
                        bg-[#C8EE44]
                        flex items-center
                        gap-[12px]
                        pl-[15px] pr-[81px] py-[14px]
                    "
                >
                    <img src="/icons/dashboard.png" alt="Dashboard" className="w-[20px] h-[20px] object-contain" />
                    <span
                        className="text-[14px] font-semibold leading-[1] text-[#1B212D]"
                        style={{
                            width: 72,
                            height: 17,
                            fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                        }}
                    >
                        Dashboard
                    </span>
                </button>

                {[
                    { icon: "/icons/transactions.png", label: "Transactions" },
                    { icon: "/icons/invoices.png", label: "Invoices" },
                    { icon: "/icons/wallets.png", label: "My Wallets" },
                    { icon: "/icons/settings.png", label: "Settings" },
                ].map((item) => (
                    <button
                        key={item.label}
                        className="
                            w-[200px] h-[48px]
                            rounded-[8px]
                            flex items-center
                            gap-[12px]
                            pl-[15px] pr-[81px] py-[14px]
                            text-left
                            hover:bg-[#F1F2F5]
                            transition
                        "
                    >
                        <img src={item.icon} alt={item.label} className="w-[20px] h-[20px] object-contain" />
                        <span
                            className="text-[14px] font-medium leading-[1]"
                            style={{
                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                color: "#929EAE",
                            }}
                        >
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto flex flex-col gap-[8px] w-[200px]">
                {[
                    { icon: "/icons/help.png", label: "Help" },
                    { icon: "/icons/logout.png", label: "Logout" },
                ].map((item) => (
                    <button
                        key={item.label}
                        className="
                            w-[200px] h-[48px]
                            rounded-[8px]
                            flex items-center
                            gap-[12px]
                            pl-[15px] pr-[81px] py-[14px]
                            text-left
                            hover:bg-[#F1F2F5]
                            transition
                        "
                    >
                        <img src={item.icon} alt={item.label} className="w-[20px] h-[20px] object-contain" />
                        <span
                            className="text-[14px] font-medium leading-[1]"
                            style={{
                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                color: "#929EAE",
                            }}
                        >
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </aside>
    );
};
