import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background shadow-sm",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
                destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md",
                outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
                secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20",
                ghost: "hover:bg-white/10 text-white hover:text-white",
                link: "underline-offset-4 hover:underline text-primary",
            },
            size: {
                default: "h-11 py-3 px-6",
                sm: "h-9 px-4 rounded-lg text-xs",
                lg: "h-13 px-8 rounded-xl text-base",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 