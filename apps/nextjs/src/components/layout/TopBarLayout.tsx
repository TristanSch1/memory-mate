import { type ComponentPropsWithoutRef } from "react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { clsx } from "clsx";
import { ChevronLeft } from "lucide-react";

type TopBarHeaderProps = ComponentPropsWithoutRef<"header"> & {
  title?: string;
  backRoute?: string;
  renderRight?: () => JSX.Element;
};
const TopBarHeader = ({
  title,
  backRoute,
  renderRight,
  className,
  ...props
}: TopBarHeaderProps) => {
  const { back, push } = useRouter();
  const handleBack = () => {
    if (backRoute) {
      void push(backRoute);
    } else {
      back();
    }
  };
  return (
    <header
      className={cn(
        className,
        "bg-background fixed inset-x-0 top-0 flex h-20 items-center justify-center border-b p-4 shadow-sm",
      )}
      {...props}
    >
      <ChevronLeft
        size={40}
        className={
          "text-muted-foreground hover:text-foreground absolute left-3 cursor-pointer transition-colors"
        }
        onClick={handleBack}
      />
      <h1 className={"heading text-2xl"}>{title}</h1>
      <div className={"absolute right-3 flex items-center"}>
        {renderRight && renderRight()}
      </div>
    </header>
  );
};

type TopBarLayoutProps = ComponentPropsWithoutRef<"main"> & {
  headerProps?: TopBarHeaderProps;
};
const TopBarLayout = ({
  children,
  className,
  headerProps,
  ...props
}: TopBarLayoutProps) => {
  return (
    <div className={"h-screen"}>
      <TopBarHeader {...headerProps} />
      <main
        className={clsx(className, "container h-[calc(100vh-80px)] pb-8 pt-28")}
        {...props}
      >
        {children}
      </main>
    </div>
  );
};

export default TopBarLayout;
