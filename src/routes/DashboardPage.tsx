// src/routes/DashboardPage.tsx
import React from "react";

export const DashboardPage: React.FC = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#020617",
                color: "#e5e7eb",
                flexDirection: "column",
                gap: "8px",
            }}
        >
            <h1>Dashboard Page</h1>
            <p>Burası dashboard olacak.</p>
        </div>
    );
};
