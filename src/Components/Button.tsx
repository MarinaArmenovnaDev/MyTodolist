import {ReactNode} from "react";


type ButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
};
export const Button = ({onClick, disabled, className, children}: ButtonProps) => {
    return (
        <button onClick={onClick} disabled={disabled} className={className}>{children}</button>
    );
};
