import React from "react";

export const AuthPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
            <div className="w-full max-w-md px-6">
                <h1 className="text-2xl font-semibold mb-2">Maglo</h1>
                <p className="text-sm text-slate-400 mb-6"></p>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-300"></p>
                </div>
            </div>
        </div>
    );
};
