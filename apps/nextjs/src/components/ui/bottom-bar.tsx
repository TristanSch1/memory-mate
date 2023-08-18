import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

type Props = ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
};

export const BottomBar = ({
  asChild,
  className,
  children,
  ...props
}: Props) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "fixed inset-x-0 bottom-0 flex h-16 border-t bg-neutral-50 sm:hidden",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
