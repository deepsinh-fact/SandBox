import React, { useId, useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

// Mock location pin icon since react-icons/tfi is not installed
const TfiLocationPin = () => <span>📍</span>;
const InputField = React.forwardRef(function InputField(
    {
        label,
        type = "text",
        extra,
        placeholder,
        variant,
        state,
        disabled,
        restProps,
        onClickIcon,
        ...props
    },
    ref
) {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const isPassword = type === "password";
    return (
        <div className={`${extra}`}>
            <div className="flex items-center justify-between">
                <label
                    htmlFor={id}
                    className={`text-sm text-navy-700 dark:text-white ${variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
                        }`}
                >
                    {label}
                </label>
                {onClickIcon && (
                    <div
                        className="flex cursor-pointer items-center gap-0"
                        onClick={onClickIcon}
                    >
                        <span className="text-gray-400 hover:text-gray-600">
                            Current Location
                        </span>
                        <TfiLocationPin className="text-xl" />
                    </div>
                )}
            </div>
            <div className="relative mt-2">
                <input
                    className={`flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${disabled
                            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                            : state === "error"
                                ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                                : state === "success"
                                    ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                                    : "border-gray-200 dark:!border-white/10 dark:text-white"
                        }`}
                    placeholder={placeholder}
                    type={isPassword && showPassword ? "text" : type}
                    ref={ref}
                    disabled={disabled}
                    {...props}
                    id={id}
                />
                {isPassword && (
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </span>
                )}
            </div>
        </div>
    );
});
export default InputField;
