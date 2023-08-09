import { type ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

export type IconButtonProps = ComponentPropsWithoutRef<"div"> & {
  active?: boolean;
};

const IconButton = ({
  active,
  children,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <div
      className={clsx(className, "group rounded-lg p-2", {
        "bg-neutral-200": active,
        "hover:bg-neutral-100": !active,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default IconButton;
