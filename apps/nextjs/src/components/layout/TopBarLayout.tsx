import { type ReactNode } from "react";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";

type Props = {
  children: ReactNode;
  title?: string;
  backRoute?: string;
};

const TopBarLayout = ({ children, title, backRoute }: Props) => {
  const { back, push } = useRouter();
  const handleBack = () => {
    if (backRoute) {
      void push(backRoute);
    } else {
      back();
    }
  };
  return (
    <div>
      <header
        className={
          "flex w-full items-center justify-center border-b p-4 shadow-sm"
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
      <main className={"container py-6"}>{children}</main>
    </div>
  );
};

export default TopBarLayout;
