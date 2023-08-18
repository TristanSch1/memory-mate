import { MobileNav } from "@/components/layout/MainLayout/MobileNav";
import { SideNav } from "@/components/layout/MainLayout/SideNav";
import { URLPath } from "@/routes";
import { Book, Folder, type LucideIcon } from "lucide-react";

export type NavItem = { labelKey: string; icon: LucideIcon; url: string };

const NAV_ITEMS: NavItem[] = [
  {
    labelKey: "decks",
    icon: Book,
    url: URLPath.home,
  },
  {
    labelKey: "folders",
    icon: Folder,
    url: URLPath.folders,
  },
];

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={"flex"}>
      <SideNav items={NAV_ITEMS} />
      <main className={"w-full px-12 py-8"}>{children}</main>
      <MobileNav items={NAV_ITEMS} />
    </div>
  );
};
