import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { URLPath } from "@/routes";
import { clsx } from "clsx";
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Folder,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";

import { Logo } from "./Logo";

const SideNavItem = ({
  children,
  icon: Icon,
  url,
  extended,
  selected = false,
}: {
  children: string;
  icon: LucideIcon;
  url: string;
  extended: boolean;
  selected?: boolean;
}) => {
  return (
    <Link href={url} className={"block"}>
      <li
        className={clsx("flex items-center gap-2 rounded p-3 text-xl", {
          "text-muted-foreground": !selected,
          "bg-neutral-100": selected,
          "w-fit": !extended,
        })}
      >
        <Icon size={24} />
        <span className={extended ? "" : "hidden"}>{children}</span>
      </li>
    </Link>
  );
};
const SideNav = ({ items }: { items: NavItem[] }) => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useRouter();
  return (
    <nav
      className={clsx(
        "relative box-border hidden h-screen w-[456px] flex-col border-r p-8 sm:flex",
        {
          "w-fit": !isOpen,
        },
      )}
    >
      <Logo />
      <ul className={"mt-8 space-y-4"}>
        {items.map((item) => (
          <SideNavItem
            key={item.labelKey}
            icon={item.icon}
            selected={item.url === pathname}
            url={item.url}
            extended={isOpen}
          >
            {t(`nav.${item.labelKey}`)}
          </SideNavItem>
        ))}
      </ul>
      <div
        className={
          "text-muted-foreground absolute -right-5 w-fit cursor-pointer rounded-full border bg-neutral-100 p-2 transition-all hover:scale-110"
        }
      >
        {isOpen ? (
          <ChevronLeft size={20} onClick={() => setIsOpen(false)} />
        ) : (
          <ChevronRight size={20} onClick={() => setIsOpen(true)} />
        )}
      </div>
    </nav>
  );
};
type NavItem = { labelKey: string; icon: LucideIcon; url: string }[];

const NAV_ITEMS: NavItem = [
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
    </div>
  );
};
