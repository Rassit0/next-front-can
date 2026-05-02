"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  item: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  index: number;
}
export const Item = ({ item, index }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      key={index}
      className={clsx(
        "flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl transition-all duration-150",
        {
          " hover:bg-background-tertiary":
            pathname !== item.href && !pathname.startsWith(item.href),
          "text-sky-700 dark:text-sky-400 font-bold border-l-4 border-sky-600 bg-background-tertiary":
            pathname === item.href || pathname.startsWith(item.href),
        },
      )}
      href={item.href}
    >
      {item.icon && (
        <span
          className={clsx({
            "text-foreground/80": pathname !== item.href,
          })}
        >
          {item.icon}
        </span>
      )}
      <span className="text-sm font-semibold hidden lg:block nav-text select-none">
        {item.label}
      </span>
    </Link>
  );
};
