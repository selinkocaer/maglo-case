export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL ?? "https://case.nodelabs.dev/api";

const TOKEN_KEY = "maglo_token";

export function getAccessToken(): string | null {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}

export function clearAccessToken() {
    try {
        localStorage.removeItem(TOKEN_KEY);
    } catch {}
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getAccessToken();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string> | undefined),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
        credentials: "include",
    });
    try {
        console.log("API RAW RESPONSE →", path, await res.clone().json());
    } catch (err) {
        console.log("API RAW RESPONSE (JSON parse ERROR) →", path);
    }

    if (!res.ok) {
        let message = res.statusText;

        try {
            const body = await res.json();
            if (typeof (body as any)?.message === "string") {
                message = (body as any).message;
            }
        } catch {}

        if (res.status === 401) {
            console.error("401: Token yok veya geçersiz");
        } else {
            console.error(`${res.status}: ${message}`);
        }

        throw new Error(message);
    }

    return (await res.json()) as T;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
    lastLoginAt: string;
    lastLoginIP: string | null;
    createdAt: string;
    updatedAt: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        accessToken: string;
    };
}

interface RegisterResponseData {
    id: string;
    fullName: string;
    email: string;
}

interface RegisterResponse {
    success: boolean;
    message: string;
    data: RegisterResponseData;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    fullName: string;
    email: string;
    password: string;
}

export async function registerUser(input: RegisterInput) {
    const res = await request<RegisterResponse>("/users/register", {
        method: "POST",
        body: JSON.stringify(input),
    });

    return res;
}

export async function loginUser(input: LoginInput) {
    const res = await request<LoginResponse>("/users/login", {
        method: "POST",
        body: JSON.stringify(input),
    });

    if (res?.data?.accessToken) {
        try {
            localStorage.setItem(TOKEN_KEY, res.data.accessToken);
        } catch {}
    }

    return res;
}

export async function logoutUser() {
    try {
        await request("/users/logout", {
            method: "POST",
        });
    } catch {
    } finally {
        clearAccessToken();
    }
}

export interface FinancialAmount {
    amount: number;
    currency: string;
}

export interface FinancialSummary {
    totalBalance: FinancialAmount;
    totalExpense: FinancialAmount;
    totalSavings: FinancialAmount;
    lastUpdated: string;
}

export interface WorkingCapitalPoint {
    month: string;
    income: number;
    expense: number;
    net: number;
}

export interface WorkingCapitalSummary {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
}

export interface WorkingCapital {
    period: string;
    currency: string;
    data: WorkingCapitalPoint[];
    summary: WorkingCapitalSummary;
}

export interface WalletCard {
    id: string;
    bank: string;
    name: string;
    type: string;
    cardNumber: string;
    color: string;
    expiryMonth: number;
    expiryYear: number;
    network: string;
    isDefault: boolean;

    balance?: number;
    currency?: string;
}

export interface Wallet {
    cards: WalletCard[];
}

export interface RecentTransaction {
    id: string;

    name: string;
    business: string;
    image: string;
    type: string;
    amount: number;
    currency: string;
    date: string;
    direction: "income" | "expense";
}

export interface RecentTransactionsSummary {
    totalIn: number;
    totalOut: number;
}

export interface RecentTransactions {
    transactions: RecentTransaction[];
    summary: RecentTransactionsSummary;
}

export interface ScheduledTransfer {
    id: string;
    name: string;
    image: string;
    date: string;
    amount: number;
    currency: string;
    status: string;
}

export interface ScheduledTransfersSummary {
    count: number;
    totalScheduledAmount: number;
}

export interface ScheduledTransfers {
    transfers: ScheduledTransfer[];
    summary: ScheduledTransfersSummary;
}

export function fetchDashboardSummary() {
    return request<ApiResponse<FinancialSummary>>("/financial/summary").then((res) => res.data);
}

export function fetchWorkingCapital() {
    return request<ApiResponse<WorkingCapital>>("/financial/working-capital").then((res) => res.data);
}

export function fetchWallet() {
    return request<ApiResponse<Wallet>>("/financial/wallet").then((res) => res.data);
}

export function fetchRecentTransactions() {
    return request<ApiResponse<RecentTransactions>>("/financial/transactions/recent").then((res) => res.data);
}

export function fetchScheduledTransfers() {
    return request<ApiResponse<ScheduledTransfers>>("/financial/transfers/scheduled").then((res) => res.data);
}
