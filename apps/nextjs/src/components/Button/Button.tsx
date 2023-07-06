import { type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

export const Button = ({ children, ...props }: Props) => {
  return (
    <button className={"bg-secondary-500 px-4 h-10 rounded"} {...props}>
      {children}
    </button>
  );
};
