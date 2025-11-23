import React from "react";

export const DashboardTopBar: React.FC = () => {
    return (
        <div className="w-full h-[48px] flex items-center justify-between">
            <h1
                className="text-[25px] font-semibold leading-[1] text-[#1B212D]"
                style={{
                    width: 128,
                    height: 31,
                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                }}
            ></h1>

            <div className="w-[353px] h-[48px] flex items-center justify-between gap-[45px]">
                <button className="w-[24px] h-[24px] flex items-center justify-center">
                    <img src="/icons/search.png" alt="Search" className="w-[24px] h-[24px] object-contain" />
                </button>

                <button className="w-[24px] h-[24px] flex items-center justify-center">
                    <img src="/icons/bing.png" alt="Notifications" className="w-[24px] h-[24px] object-contain" />
                </button>

                <div
                    className="
                        w-[215px] h-[48px]
                        rounded-full
                        bg-[#FAFAFA]
                        shadow-[0_10px_40px_rgba(15,23,42,0.06)]
                        flex items-center justify-between
                        pl-[7px] pr-[15px] py-[6px]
                    "
                >
                    <div className="flex items-center gap-[12px] w-[148px] h-[36px]">
                        <img src="/icons/image.png" alt="Mahfuzul Nabil" className="w-[36px] h-[36px] rounded-full object-cover" />
                        <span
                            className="text-[14px] font-semibold leading-[1] text-[#1B212D]"
                            style={{
                                width: 100,
                                height: 17,
                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                            }}
                        >
                            Mahfuzul Nabil
                        </span>
                    </div>

                    <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="#1B212D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
