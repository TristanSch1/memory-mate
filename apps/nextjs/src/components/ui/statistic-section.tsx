import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ArrowDown, ArrowUp, Equal } from "lucide-react";

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
  progress?: number;
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
        "flex items-baseline justify-between border-b pb-1",
      )}
      {...props}
    >
      <span className={cn("text-foreground font-medium")}>{label}</span>
      <span className={"text-muted-foreground"}>{value ?? "-"}</span>
    </p>
  );
});

StatisticSectionItem.displayName = "StatisticSectionItem";

type StatisticSectionProgressItem = Omit<
  ComponentPropsWithoutRef<"p">,
  "children"
> & {
  label: string;
  value: number;
};

const ProgressIcon = ({ progress }: { progress: number }) => {
  if (progress > 0) {
    return <ArrowUp className={"h-4 w-4"} />;
  }

  if (progress < 0) {
    return <ArrowDown className={"h-4 w-4"} />;
  }

  return <Equal className={"h-4 w-4"} />;
};

export const StatisticSectionProgressItem = forwardRef<
  HTMLParagraphElement,
  StatisticSectionProgressItem
>(({ label, value, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        className,
        "flex items-baseline justify-between border-b pb-1 last:border-b-0 last:pb-0",
      )}
      {...props}
    >
      <span className={cn("text-foreground font-medium")}>{label}</span>
      <span
        className={cn("flex items-center", {
          "text-green-500": value > 0,
          "text-red-500": value < 0,
          "text-primary": value === 0,
          "text-muted-foreground": !value,
        })}
      >
        <ProgressIcon progress={value} />
        {Math.abs(value)}%
      </span>
    </p>
  );
});

StatisticSectionProgressItem.displayName = "StatisticSectionProgressItem";
