import { type ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

type Props = ComponentPropsWithoutRef<"div">;

export const ReviewContainer = ({ className, children, ...props }: Props) => {
  return (
    <div
      className={clsx(className, "mx-auto flex h-full max-w-[500px]")}
      {...props}
    >
      {children}
    </div>
  );
};
