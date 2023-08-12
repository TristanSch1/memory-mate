import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

type IconWithLabelProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  icon: LucideIcon;
  label: React.ReactNode;
  reverse?: boolean;
};

const IconWithLabel = forwardRef<HTMLDivElement, IconWithLabelProps>(
  ({ icon: Icon, label, reverse, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          className,
          "text-muted-foreground flex items-center gap-1 text-sm",
          {
            "flex-row-reverse": reverse,
          },
        )}
        {...props}
      >
        {<Icon size={16} />}
        <label>{label}</label>
      </div>
    );
  },
);

IconWithLabel.displayName = "IconWithLabel";

export { IconWithLabel };
