// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./routes/AuthPage";
import { DashboardPage } from "./routes/DashboardPage";

const isAuthenticated = () => !!localStorage.getItem("maglo_token");

type ProtectedRouteProps = {
    children: React.ReactElement;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/auth" replace />;
    }
    return children;
};

export const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/auth"} replace />} />
        </Routes>
    );
};
