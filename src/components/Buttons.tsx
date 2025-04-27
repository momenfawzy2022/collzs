import { ReactNode } from "react";

interface ButtonProps {
    text: string;
    backgroundColor?: string;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
}

export const Buttons = ({
    text,
    backgroundColor = "bg-yellow-300",
    rightIcon,
    leftIcon
}: ButtonProps) => {
    return (
        <button 
            className={`py-3 px-6 rounded-full flex items-center gap-2 ${backgroundColor} 
                       hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-yellow-500 transition-all`}
            aria-label={text}
        >
            <span className="font-general text-sl uppercase">
                {text}
            </span>
            {leftIcon}
            {rightIcon}
        </button>
    )
}