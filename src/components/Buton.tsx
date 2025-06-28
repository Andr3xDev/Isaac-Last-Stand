import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
    label: string;
    to: string;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    to,
    disabled = false,
    className,
}) => {
    const baseClasses = `
    block w-full p-9 
    text-7xl
    text-center font-semibold
    transition-all duration-150 ease-in-out
  `;

    const enabledClasses = "hover:text-gray-800 active:scale-95";

    const disabledClasses = "text-red-800 cursor-not-allowed";

    if (disabled) {
        return (
            <span
                className={`${baseClasses} ${disabledClasses} ${
                    className ?? ""
                }`.trim()}
            >
                {label}
            </span>
        );
    }

    return (
        <Link
            to={to}
            className={`${baseClasses} ${enabledClasses} ${
                className ?? ""
            }`.trim()}
        >
            {label}
        </Link>
    );
};

export default Button;
