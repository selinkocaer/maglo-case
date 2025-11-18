import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const navigate = useNavigate();

    const validate = () => {
        const next: typeof errors = {};
        if (!email.trim()) next.email = "Email is required.";
        if (!password.trim()) next.password = "Password is required.";
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

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#E6E8EE]">
            <div className="flex-1 md:flex-[0.55] bg-white flex flex-col">
                <div className="pt-[40px] pl-[135px]">
                    <img src="/logo.png" alt="Maglo logo" className="w-[122px] h-[30px] object-contain" />
                </div>

                <div className="flex-1 flex">
                    <div className="mt-[120px] pl-[135px] pr-[32px]">
                        <div className="w-[404px] h-[445px] flex flex-col justify-between space-y-[25px]">
                            <div className="w-[299px]">
                                <h1 className="w-[95px] h-[37px] text-[30px] font-semibold leading-[1] text-[#1B212D] mb-[8px]" style={{ fontFamily: '"Kumbh Sans", system-ui, sans-serif' }}>
                                    Sign In
                                </h1>
                                <p className="w-[299px] h-[20px] text-[16px] leading-[1] text-[#78778B]" style={{ fontFamily: '"Kumbh Sans", system-ui, sans-serif' }}>
                                    Welcome back! Please enter your details.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="w-[404px] h-[175px]">
                                <div className="w-[404px] h-[175px] flex flex-col gap-[20px]">
                                    <div className="w-[404px] h-[85px] flex flex-col gap-[5px]">
                                        <label className="text-[13px] font-medium text-[#4B5563]" style={{ fontFamily: '"Kumbh Sans", system-ui, sans-serif' }}>
                                            Email
                                        </label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-[404px] h-[48px] rounded-[10px] bg-[#F9FAFB] border border-[#F5F5F5] text-[14px] px-[20px] outline-none placeholder:text-[#9CA3AF] focus:border-[#111827]" placeholder="example@gmail.com" />
                                        {errors.email && <p className="text-[12px] text-[#EF4444] leading-none">{errors.email}</p>}
                                    </div>

                                    <div className="w-[404px] h-[85px] flex flex-col gap-[5px]">
                                        <label className="text-[13px] font-medium text-[#4B5563]" style={{ fontFamily: '"Kumbh Sans", system-ui, sans-serif' }}>
                                            Password
                                        </label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-[404px] h-[48px] rounded-[10px] bg-[#F9FAFB] border border-[#F5F5F5] text-[14px] px-[20px] outline-none placeholder:text-[#9CA3AF] focus:border-[#111827]" placeholder="••••••••" />
                                        {errors.password && <p className="text-[12px] text-[#EF4444] leading-none">{errors.password}</p>}
                                    </div>
                                </div>
                            </form>

                            <div className="w-[404px] h-[155px] flex flex-col gap-[25px]">
                                <div className="w-[404px] h-[113px] flex flex-col gap-[15px]">
                                    <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="w-[404px] h-[48px] rounded-[10px] bg-[#C8EE44] text-[#111827] text-[14px] font-medium px-[20px] py-[14px] flex items-center justify-center transition disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#B9E53F]">
                                        {isSubmitting ? "Signing in..." : "Sign In"}
                                    </button>

                                    <button type="button" className="w-[404px] h-[50px] rounded-[10px] border border-[#F5F5F5] bg-white text-[14px] text-[#4B5563] px-[20px] py-[13px] flex items-center justify-center gap-[10px] hover:bg-[#F9FAFB] transition">
                                        <span className="w-[18px] h-[18px] rounded-full bg-[#FFFFFF] border border-[#F5F5F5]" />
                                        <span>Sign in with google</span>
                                    </button>
                                </div>

                                <div className="flex flex-col items-center">
                                    <p className="w-[205px] h-[17px] text-[14px] leading-[1] text-center text-[#9CA3AF]" style={{ fontFamily: '"Kumbh Sans", system-ui, sans-serif' }}>
                                        Don&apos;t have an account?{" "}
                                        <button
                                            type="button"
                                            className="text-[#111827] font-normal"
                                            style={{
                                                fontFamily: '"Kumbh Sans", system-ui, sans-serif',
                                            }}
                                        >
                                            Sign up
                                        </button>
                                    </p>

                                    <svg className="mt-[10px]" width="43" height="5" viewBox="0 0 43 5" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 4C10 0.5 33 0.5 42 4" stroke="#C8EE44" strokeWidth={3} fill="none" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
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
