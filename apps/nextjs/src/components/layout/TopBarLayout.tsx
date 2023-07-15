import { type ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode
  title?: string
  backRoute?: string
};

const TopBarLayout = ({ children, title, backRoute }: Props) => {
  const { back, push } = useRouter();
  const handleBack = () => {
    if (backRoute) {
      void push(backRoute);
    } else {
      back();
    }
  }
  return (
    <div>
      <header className={"flex items-center w-full p-4 justify-center border-b shadow-sm"}>
        <ChevronLeft size={40} className={"absolute left-3 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"} onClick={handleBack}/>
        <h1 className={"heading text-2xl"}>{title}</h1>
      </header>
      <main className={"container py-8"}>
        {children}
      </main>
    </div>
  );
};

export default TopBarLayout;
