import { ReactNode } from "react";

interface ButtonProps {
    text: string;
    backgroundColor?: string;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode; className?: string;
}

export const Buttons = ({
    text,
    backgroundColor = "bg-yellow-300",
    rightIcon,
    leftIcon, className
}: ButtonProps) => {
    return (
        <button 
            className={`py-3 px-6 rounded-full flex items-center ${className} gap-2 ${backgroundColor} 
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
export default Buttons;