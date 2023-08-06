import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export const StatisticSectionTitle = ({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp className={cn("text-2xl font-bold text-primary-900 sm:text-3xl")}>
      {children}
    </Comp>
  );
};

type StatisticSectionDescriptionProps = ComponentPropsWithoutRef<"p">;
export const StatisticSectionDescription = forwardRef(
  ({ children, className, ...props }: StatisticSectionDescriptionProps) => {
    return (
      <p className={cn(className, "text-lg text-primary-700")} {...props}>
        {children}
      </p>
    );
  },
);

StatisticSectionDescription.displayName = "StatisticSectionDescription";

type StatisticSectionProps = ComponentPropsWithoutRef<"div">;

export const StatisticSection = forwardRef(
  ({ children, className, ...props }: StatisticSectionProps) => {
    return (
      <div
        className={cn(
          className,
          "flex flex-col items-center justify-center space-y-4",
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

StatisticSection.displayName = "StatisticSection";

type StatisticSectionItemProps = Omit<
  ComponentPropsWithoutRef<"p">,
  "children"
> & {
  label: string;
  value: string;
};

export const StatisticSectionItem = forwardRef<
  HTMLParagraphElement,
  StatisticSectionItemProps
>(({ label, value, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        className,
        "flex flex-col items-center justify-center space-y-2",
      )}
      {...props}
    >
      <span className={cn("text-2xl font-bold text-primary-900 sm:text-3xl")}>
        {label}
      </span>
      <span className={cn("text-lg text-primary-700")}>{value}</span>
    </p>
  );
});

StatisticSectionItem.displayName = "StatisticSectionItem";
