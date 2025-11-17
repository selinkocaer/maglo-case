import React from "react";
import { useAuth } from "../context/AuthContext";

export const DashboardPage: React.FC = () => {
    const { user, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">Maglo</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                    {user && (
                        <div className="text-sm text-slate-300">
                            <span className="font-medium">{user.name}</span> <span className="text-slate-500">({user.email})</span>
                        </div>
                    )}
                    <button onClick={signOut} className="text-xs rounded-lg border border-slate-700 px-3 py-1.5 hover:bg-slate-800 transition">
                        Sign out
                    </button>
                </div>
            </header>

            <main className="px-6 py-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-xl font-semibold mb-2">Dashboard</h1>
                    <p className="text-sm text-slate-400 mb-4"></p>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                        <p className="text-sm text-slate-300"></p>
                    </div>
                </div>
            </main>
        </div>
    );
};
