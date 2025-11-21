import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const validate = () => {
        const next: Record<string, string> = {};

        if (!email.trim()) next.email = "Email is required.";
        if (!password.trim()) next.password = "Password is required.";

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            navigate("/dashboard", { replace: true });
            setIsSubmitting(false);
        }, 500);
    };

    const inputClass = "w-[404px] h-[48px] rounded-[10px] border border-[#F5F5F5] " + "pt-[15px] pr-[25px] pb-[16px] pl-[20px] " + "bg-[#F9FAFB] text-[14px] text-[#1B212D] " + "outline-none placeholder:text-[#9CA3AF] focus:border-[#111827]";

    const labelClass = "w-[67px] h-[17px] text-[14px] font-medium leading-[1] text-[#1B212D]";

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#E6E8EE]">
            {/* SOL PANEL */}
            <div className="flex-1 md:flex-[0.55] bg-white flex flex-col">
                {/* Logo: top 40, left 135, 122x30 */}
                <div className="pt-[40px] pl-[135px]">
                    <img src="/logo.png" alt="Maglo logo" className="w-[122px] h-[30px] object-contain" />
                </div>

                <div className="flex-1 flex">
                    <div className="mt-[120px] pl-[135px] pr-[32px]">
                        {/* Dış blok: Sign In 404x445, Sign Up 404x535 */}
                        <div className="w-[404px] flex flex-col justify-between space-y-[25px]" style={{ height: isSignIn ? 445 : 535 }}>
                            {/* TITLE FRAME: 299 x 65, gap 8 */}
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

                                <p className="w-[299px] h-[20px] text-[16px] leading-[1] text-[#78778B]" style={{ fontFamily: '"Kumbh Sans", system-ui, sans-serif' }}>
                                    {isSignIn ? "Welcome back! Please enter your details." : "Create your account to get started."}
                                </p>
                            </div>

                            {/* FORM (MAIN + BOTTOM) */}
                            <form onSubmit={handleSubmit} className="w-[404px] flex flex-col gap-[25px]">
                                {/* MAIN FRAME */}
                                {isSignIn ? (
                                    // SIGN IN MAIN – 404 x 175, gap 20
                                    <div className="w-[404px] h-[175px] flex flex-col gap-[20px]">
                                        {/* Email */}
                                        <div className="w-[404px] h-[85px] flex flex-col gap-[5px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Email
                                            </span>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="example@gmail.com" />
                                            {errors.email && <p className="text-[12px] text-[#EF4444] leading-none">{errors.email}</p>}
                                        </div>

                                        {/* Password */}
                                        <div className="w-[404px] h-[85px] flex flex-col gap-[5px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Password
                                            </span>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                                            {errors.password && <p className="text-[12px] text-[#EF4444] leading-none">{errors.password}</p>}
                                        </div>
                                    </div>
                                ) : (
                                    // SIGN UP MAIN – 404 x 265, gap 20
                                    <div className="w-[404px] h-[265px] flex flex-col gap-[20px]">
                                        {/* Full name */}
                                        <div className="w-[404px] h-[85px] flex flex-col gap-[10px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Full name
                                            </span>
                                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} placeholder="John Doe" />
                                            {errors.fullName && <p className="text-[12px] text-[#EF4444] leading-none">{errors.fullName}</p>}
                                        </div>

                                        {/* Email */}
                                        <div className="w-[404px] h-[85px] flex flex-col gap-[10px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Email
                                            </span>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="example@gmail.com" />
                                        </div>

                                        {/* Password – ekstra boşluk için mb-[25px] */}
                                        <div className="w-[404px] h-[85px] flex flex-col gap-[10px] mb-[25px]">
                                            <span
                                                className={labelClass}
                                                style={{
                                                    fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                                }}
                                            >
                                                Password
                                            </span>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                                            {errors.password && <p className="text-[12px] text-[#EF4444] leading-none">{errors.password}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* BOTTOM FRAME: 404 x 155, gap 25 */}
                                <div className="w-[404px] h-[155px] flex flex-col gap-[25px]">
                                    {/* Butonlar: 404 x 113, gap 15 */}
                                    <div className="w-[404px] h-[113px] flex flex-col gap-[15px]">
                                        {/* Primary button */}
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
                                            {isSubmitting ? (isSignIn ? "Signing in..." : "Creating account...") : isSignIn ? "Sign In" : "Create account"}
                                        </button>

                                        {/* Google button */}
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

                                    {/* Alt metin + vektör */}
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

            {/* SAĞ PANEL */}
            <div className="hidden md:flex md:flex-[0.45] bg-[#E4E6EB] items-center justify-center relative overflow-hidden">
                <img src="/auth-signin.png" alt="Maglo sign-in illustration" className="h-full w-auto object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-[170px] bg-[#F2D8CF]" />
                <div className="absolute bottom-[48px] left-1/2 -translate-x-1/2 w-[260px] h-[10px] rounded-full bg-[#D1D5DB]" />
            </div>
        </div>
    );
};
