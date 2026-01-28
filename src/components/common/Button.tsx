import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    disabled,
    ...props
}) => {
    const baseStyles = "rounded-toss font-semibold transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-toss-blue text-white hover:bg-opacity-90 active:bg-blue-600",
        secondary: "bg-toss-lightBlue text-toss-blue hover:bg-blue-100",
        ghost: "bg-transparent text-toss-gray-600 hover:bg-toss-gray-100"
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-5 py-3.5 text-base",
        lg: "px-6 py-4 text-lg"
    };

    return (
        <motion.button
            whileTap={{ scale: disabled ? 1 : 0.96 }}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth ? "w-full" : "w-auto",
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
