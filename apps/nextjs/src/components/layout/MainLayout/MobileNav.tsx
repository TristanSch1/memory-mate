import Link from "next/link";
import { useRouter } from "next/router";
import { type NavItem } from "@/components/layout";
import { BottomBar } from "@/components/ui/bottom-bar";
import { clsx } from "clsx";

type MobileNavItemProps = {
  item: NavItem;
  selected: boolean;
};

const MobileNavItem = ({ item, selected }: MobileNavItemProps) => {
  const Icon = item.icon;
  return (
    <Link
      href={item.url}
      className={"relative flex h-full flex-1 items-center justify-center px-4"}
    >
      <Icon
        size={20}
        className={selected ? "text-primary" : "text-muted-foreground"}
      />
      <div
        className={clsx(
          "bg-primary absolute bottom-3 h-1 w-1 rounded-full",
          selected ? "block" : "hidden",
        )}
      />
    </Link>
  );
};

type Props = {
  items: NavItem[];
};

export const MobileNav = ({ items }: Props) => {
  const { pathname } = useRouter();

  return (
    <BottomBar asChild className={"sm:hidden"}>
      <nav>
        {items.map((item) => {
          return (
            <MobileNavItem
              item={item}
              selected={pathname === item.url}
              key={item.labelKey}
            />
          );
        })}
      </nav>
    </BottomBar>
  );
};
