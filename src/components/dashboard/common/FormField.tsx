import React from "react";

interface FormFieldProps {
    label: string;
    error?: string;
    children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => {
    return (
        <div className="w-[404px] flex flex-col gap-[6px] mb-[10px]">
            <label className="text-[14px] font-medium text-[#1B212D]" style={{ fontFamily: '"Kumbh Sans", system-ui, sans-serif' }}>
                {label}
            </label>

            {children}

            {error && <p className="text-[12px] text-[#EF4444] mt-[4px] leading-[1.2]">{error}</p>}
        </div>
    );
};
