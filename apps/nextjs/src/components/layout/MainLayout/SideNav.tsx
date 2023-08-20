import { useState, type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type NavItem } from "@/components/layout";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { useModal } from "@/providers/ModalProvider";
import { clsx } from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";

type SideNavItemProps = ComponentPropsWithoutRef<"li"> & {
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
    <li
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded p-3 text-xl transition-all hover:text-neutral-950",
        className,
        {
          "text-muted-foreground": !selected,
          "bg-neutral-100": selected,
          "w-fit": !extended,
        },
      )}
      {...props}
    >
      <Icon size={24} />
      <span className={extended ? "" : "hidden"}>{children}</span>
    </li>
  );
};

type SideNavProps = {
  items: NavItem[];
};
export const SideNav = ({ items }: SideNavProps) => {
  const { t } = useTranslation("common");
  const { open } = useModal();
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
          <Link href={item.url} key={item.labelKey}>
            <SideNavItem
              icon={item.icon}
              selected={item.url === pathname}
              extended={isOpen}
            >
              {t(`nav.${item.labelKey}`)}
            </SideNavItem>
          </Link>
        ))}
        <div className={"flex-1"} />
        <SideNavItem
          icon={Settings}
          extended={isOpen}
          onClick={() => open("settings")}
        >
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
