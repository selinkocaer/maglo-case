import React from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { SummaryCardsRow } from "../components/dashboard/SummaryCardsRow";
import { WorkingCapitalCard } from "../components/dashboard/WorkingCapitalCard";
import { RecentTransactionsCard } from "../components/dashboard/RecentTransactionsCard";
import { WalletSection } from "../components/dashboard/WalletSection";
import { ScheduledTransfersSection } from "../components/dashboard/ScheduledTransfersSection";
import { DashboardTopBar } from "../components/dashboard/DashboardTopBar";

export const DashboardPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-[#FFFFFF] flex">
            <Sidebar />

            <main className="flex-1 min-h-screen bg-[#FFFFFF] pt-[30px] pr-[40px] pb-[40px] pl-[40px]">
                <DashboardTopBar />

                <div className="mt-[30px] flex gap-[30px]">
                    <div className="w-[717px] flex flex-col gap-[30px]">
                        <SummaryCardsRow />
                        <WorkingCapitalCard />
                        <RecentTransactionsCard />
                    </div>

                    <div className="w-[354px] flex flex-col gap-[30px]">
                        <WalletSection />
                        <ScheduledTransfersSection />
                    </div>
                </div>
            </main>
        </div>
    );
};
