"use client";
import { NavItem } from "@/ui/interfaces/sidebar/sidebar";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  item: NavItem;
  index: number;
}
export const Item = ({ item, index }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href);
  return (
    <Link
      key={index}
      className={clsx(
        "flex flex-col items-center justify-center rounded-2xl px-5 py-2 active:scale-90 transition-all duration-300",
        isActive
          ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
          : "bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
      )}
      href={item.href}
    >
      {item.icon}
      <span className="font-inter text-[11px] font-bold tracking-tighter uppercase mt-1">
        {item.label}
      </span>
    </Link>
  );
};
