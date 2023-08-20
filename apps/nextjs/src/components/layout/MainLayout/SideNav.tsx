import { useState, type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type NavItem } from "@/components/layout";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { URLPath } from "@/routes";
import { clsx } from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";

type SideNavItemProps = ComponentPropsWithoutRef<typeof Link> & {
  icon: LucideIcon;
  extended: boolean;
  selected?: boolean;
};
const SideNavItem = ({
  children,
  className,
  icon: Icon,
  extended,
  selected = false,
  ...props
}: SideNavItemProps) => {
  return (
    <Link className={cn("block", className)} {...props}>
      <li
        className={cn(
          "flex items-center gap-2 rounded p-3 text-xl transition-all hover:text-neutral-950",
          {
            "text-muted-foreground": !selected,
            "bg-neutral-100": selected,
            "w-fit": !extended,
          },
        )}
      >
        <Icon size={24} />
        <span className={extended ? "" : "hidden"}>{children}</span>
      </li>
    </Link>
  );
};

type SideNavProps = {
  items: NavItem[];
};
export const SideNav = ({ items }: SideNavProps) => {
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
      <ul className={"mt-8 flex h-full flex-col space-y-4"}>
        {items.map((item) => (
          <SideNavItem
            key={item.labelKey}
            icon={item.icon}
            selected={item.url === pathname}
            href={item.url}
            extended={isOpen}
          >
            {t(`nav.${item.labelKey}`)}
          </SideNavItem>
        ))}
        <div className={"flex-1"} />
        <SideNavItem icon={Settings} href={URLPath.settings} extended={isOpen}>
          Settings
        </SideNavItem>
      </ul>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          "text-muted-foreground absolute -right-5 w-fit cursor-pointer rounded-full border bg-neutral-100 p-2 transition-all hover:scale-110"
        }
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </nav>
  );
};
