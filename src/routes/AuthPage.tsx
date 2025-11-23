import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser, registerUser } from "../lib/api";

type AuthMode = "signin" | "signup";

export const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>("signin");

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();
    const isSignIn = mode === "signin";

    const resetErrors = () => setErrors({});

    useEffect(() => {
        const token = localStorage.getItem("maglo_token");
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const validate = () => {
        const next: Record<string, string> = {};

        if (!email.trim()) {
            next.email = "Email is required.";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) next.email = "Please enter a valid email.";
        }

        if (!password.trim()) {
            next.password = "Password is required.";
        } else {
            if (!isSignIn) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
                if (!passwordRegex.test(password)) {
                    next.password = "Password must be at least 8 characters and include uppercase, lowercase, number and special character.";
                }
            }
        }

        if (!isSignIn) {
            if (!fullName.trim()) next.fullName = "Full name is required.";

            if (!confirmPassword.trim()) {
                next.confirmPassword = "Please confirm your password.";
            } else if (password && confirmPassword && password !== confirmPassword) {
                next.confirmPassword = "Passwords do not match.";
            }
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("Please fix the form errors.");
            return;
        }

        try {
            setIsSubmitting(true);

            if (isSignIn) {
                const res = await loginUser({ email, password });

                toast.success(res.message || "Sign in successful");
                navigate("/dashboard", { replace: true });
            } else {
                await registerUser({ fullName, email, password });
                await loginUser({ email, password });

                toast.success("Account created successfully");
                navigate("/dashboard", { replace: true });
            }
        } catch (err: any) {
            console.error(err);
            const msg = err?.message || "Something went wrong. Please check your information and try again.";
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-[404px] h-[48px] rounded-[10px] border border-[#F5F5F5] " + "pt-[15px] pr-[25px] pb-[16px] pl-[20px] " + "bg-[#F9FAFB] text-[14px] text-[#1B212D] " + "outline-none placeholder:text-[#9CA3AF] focus:border-[#111827]";

    const labelClass = "w-[67px] h-[17px] text-[14px] font-medium leading-[1] text-[#1B212D]";

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#E6E8EE]">
            <div className="flex-1 md:flex-[0.55] bg-white flex flex-col">
                <div className="pt-[40px] pl-[135px]">
                    <img src="/logo.png" alt="Maglo logo" className="w-[122px] h-[30px] object-contain" />
                </div>

                <div className="flex-1 flex">
                    <div className="mt-[120px] pl-[135px] pr-[32px]">
                        <div className="w-[404px] flex flex-col justify-between space-y-[25px]" style={{ height: isSignIn ? 445 : "auto" }}>
                            <div className="w-[299px] h-[65px] flex flex-col gap-[8px]">
                                <h1
                                    className="h-[37px] text-[30px] font-semibold leading-[1] text-[#1B212D]"
                                    style={{
                                        width: isSignIn ? 95 : 283,
                                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                    }}
                                >
                                    {isSignIn ? "Sign In" : "Create new account"}
                                </h1>

                                <p
                                    className="w-[299px] h-[20px] text-[16px] leading-[1] text-[#78778B]"
                                    style={{
                                        fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                    }}
                                >
                                    {isSignIn ? "Welcome back! Please enter your details." : "Create your account to get started."}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="w-[404px] flex flex-col gap-[25px]">
                                {isSignIn ? (
                                    <div className="w-[404px] h-[175px] flex flex-col gap-[20px]">
                                        <div className="w-[404px] h-[85px] flex flex-col gap-[5px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Email
                                            </span>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="example@gmail.com" disabled={isSubmitting} autoComplete="email" />
                                            {errors.email && <p className="text-[12px] text-[#EF4444] leading-none">{errors.email}</p>}
                                        </div>

                                        <div className="w-[404px] h-[85px] flex flex-col gap-[5px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Password
                                            </span>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" disabled={isSubmitting} autoComplete="current-password" />
                                            {errors.password && <p className="text-[12px] text-[#EF4444] leading-none">{errors.password}</p>}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-[404px] flex flex-col gap-[20px]">
                                        <div className="w-[404px] h-[85px] flex flex-col gap-[10px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Full name
                                            </span>
                                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} placeholder="John Doe" disabled={isSubmitting} />
                                            {errors.fullName && <p className="text-[12px] text-[#EF4444] leading-none">{errors.fullName}</p>}
                                        </div>

                                        <div className="w-[404px] h-[85px] flex flex-col gap-[10px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Email
                                            </span>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="example@gmail.com" disabled={isSubmitting} autoComplete="email" />
                                            {errors.email && <p className="text-[12px] text-[#EF4444] leading-none">{errors.email}</p>}
                                        </div>

                                        <div className="w-[404px] h-[85px] flex flex-col gap-[10px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Password
                                            </span>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" disabled={isSubmitting} autoComplete="new-password" />
                                            {errors.password ? <p className="text-[12px] text-[#EF4444] leading-none">{errors.password}</p> : <p className="text-[12px] text-[#9CA3AF] leading-none">Password must be at least 8 characters and include uppercase, lowercase, number and special character.</p>}
                                        </div>

                                        <div className="w-[404px] h-[85px] flex flex-col gap-[10px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Confirm password
                                            </span>
                                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} placeholder="••••••••" disabled={isSubmitting} autoComplete="new-password" />
                                            {errors.confirmPassword && <p className="text-[12px] text-[#EF4444] leading-none">{errors.confirmPassword}</p>}
                                        </div>
                                    </div>
                                )}

                                <div className="w-[404px] flex flex-col gap-[25px]">
                                    <div className="w-[404px] flex flex-col gap-[15px]">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="
                                                w-[404px] h-[48px]
                                                rounded-[10px]
                                                bg-[#C8EE44]
                                                text-[#1B212D]
                                                text-[16px] font-semibold
                                                px-[20px] py-[14px]
                                                flex items-center justify-center gap-[10px]
                                                transition
                                                disabled:opacity-60 disabled:cursor-not-allowed
                                                hover:bg-[#B9E53F]
                                            "
                                            style={{
                                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="h-4 w-4 border-2 border-[#1B212D] border-t-transparent rounded-full animate-spin" />
                                                    {isSignIn ? "Signing in..." : "Creating account..."}
                                                </span>
                                            ) : isSignIn ? (
                                                "Sign In"
                                            ) : (
                                                "Create account"
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            className="
                                                w-[404px] h-[50px]
                                                rounded-[10px]
                                                border border-[#F5F5F5]
                                                bg-white
                                                px-[20px] py-[13px]
                                                flex items-center justify-center gap-[10px]
                                                hover:bg-[#F9FAFB]
                                                transition
                                            "
                                        >
                                            <img src="/Google.png" alt="Google" className="w-[24px] h-[24px]" />
                                            <span
                                                className="text-[16px] font-semibold leading-[1] text-[#78778B]"
                                                style={{
                                                    width: 149,
                                                    height: 20,
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                {isSignIn ? "Sign in with google" : "Sign up with google"}
                                            </span>
                                        </button>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <p
                                            className="h-[17px] text-[14px] leading-[1] text-center text-[#9CA3AF]"
                                            style={{
                                                width: 215,
                                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                            }}
                                        >
                                            {isSignIn ? "Don’t have an account? " : "Already have an account? "}
                                            <button
                                                type="button"
                                                className="text-[#1B212D] font-normal"
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                                onClick={() => {
                                                    setMode(isSignIn ? "signup" : "signin");
                                                    resetErrors();
                                                    setPassword("");
                                                    setConfirmPassword("");
                                                }}
                                            >
                                                {isSignIn ? "Sign up" : "Sign in"}
                                            </button>
                                        </p>

                                        <svg className="mt-[10px]" width="43" height="5" viewBox="0 0 43 5" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 4C10 0.5 33 0.5 42 4" stroke="#C8EE44" strokeWidth={3} fill="none" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex md:flex-[0.45] bg-[#E4E6EB] items-center justify-center relative overflow-hidden">
                <img src="/auth-signin.png" alt="Maglo sign-in illustration" className="h-full w-auto object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-[170px] bg-[#F2D8CF]" />
                <div className="absolute bottom-[48px] left-1/2 -translate-x-1/2 w-[260px] h-[10px] rounded-full bg-[#D1D5DB]" />
            </div>
        </div>
    );
};
