import { type ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

export type IconButtonProps = ComponentPropsWithoutRef<"div"> & {
  size?: "sm" | "md" | "lg";
  active?: boolean;
};

const IconButton = ({
  size = "md",
  active,
  children,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <div
      className={clsx(className, "group rounded-lg", {
        "bg-neutral-200": active,
        "hover:bg-neutral-100": !active,
        "p-1": size === "sm",
        "p-2": size === "md",
        "p-3": size === "lg",
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default IconButton;
