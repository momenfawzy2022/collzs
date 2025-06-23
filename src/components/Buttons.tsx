import { ReactNode } from "react";

interface ButtonProps {
    text: string;
    backgroundColor?: string;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    className?: string;
    hrf?: string;
    onClick?: () => void;
}

export const Buttons = ({
    text,
    backgroundColor = "bg-yellow-300",
    rightIcon,
    leftIcon,
    className,
    hrf = "",
    onClick
}: ButtonProps) => {
    // Determine if the link is external
    const isExternal = hrf && /^(http|https):\/\//.test(hrf);

    return (
        hrf ? (
            <a
                href={hrf}
                className={`py-3 px-6 rounded-full flex items-center gap-2 ${backgroundColor} ${className} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all`}
                aria-label={text}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={onClick}
            >
                <span className="font-general text-sl uppercase">{text}</span>
                {leftIcon}
                {rightIcon}
            </a>
        ) : (
            <button
                className={`py-3 px-6 rounded-full flex items-center gap-2 ${backgroundColor} ${className} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all`}
                aria-label={text}
                onClick={onClick}
            >
                <span className="font-general text-sl uppercase">{text}</span>
                {leftIcon}
                {rightIcon}
            </button>
        )
    )
}

export default Buttons;