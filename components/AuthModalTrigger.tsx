"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { useAuthModal } from "./AuthModalProvider";

type AuthModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function AuthModalTrigger({
  children,
  onClick,
  type = "button",
  ...props
}: AuthModalTriggerProps) {
  const { openAuthModal } = useAuthModal();

  return (
    <button
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          openAuthModal();
        }
      }}
      type={type}
    >
      {children}
    </button>
  );
}
