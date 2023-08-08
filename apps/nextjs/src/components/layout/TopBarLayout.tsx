import { type ComponentPropsWithoutRef } from "react";
import { useRouter } from "next/router";
import { clsx } from "clsx";
import { ChevronLeft } from "lucide-react";

type Props = ComponentPropsWithoutRef<"main"> & {
  title?: string;
  backRoute?: string;
};

const TopBarLayout = ({
  children,
  title,
  backRoute,
  className,
  ...props
}: Props) => {
  const { back, push } = useRouter();
  const handleBack = () => {
    if (backRoute) {
      void push(backRoute);
    } else {
      back();
    }
  };
  return (
    <div className={"h-screen"}>
      <header
        className={
          "bg-background fixed inset-x-0 top-0 flex h-20 items-center justify-center border-b p-4 shadow-sm"
        }
      >
        <ChevronLeft
          size={40}
          className={
            "text-muted-foreground hover:text-foreground absolute left-3 cursor-pointer transition-colors"
          }
          onClick={handleBack}
        />
        <h1 className={"heading text-2xl"}>{title}</h1>
      </header>
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
