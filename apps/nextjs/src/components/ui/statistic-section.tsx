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
export const StatisticSectionDescription = forwardRef<
  HTMLParagraphElement,
  StatisticSectionDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(className, "text-base text-primary-700")}
      {...props}
    >
      {children}
    </p>
  );
});

StatisticSectionDescription.displayName = "StatisticSectionDescription";

type StatisticSectionProps = ComponentPropsWithoutRef<"div">;

export const StatisticSection = forwardRef<
  HTMLDivElement,
  StatisticSectionProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(className, "flex w-full flex-col justify-center space-y-3")}
      {...props}
    >
      {children}
    </div>
  );
});

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
      className={cn(className, "flex items-baseline justify-between")}
      {...props}
    >
      <span className={cn("text-foreground font-medium")}>{label}</span>
      <span className={cn("text-muted-foreground")}>{value}</span>
    </p>
  );
});

StatisticSectionItem.displayName = "StatisticSectionItem";
