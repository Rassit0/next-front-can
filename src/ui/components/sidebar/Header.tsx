import { IOrganization } from "@/modules/organizations";
import Link from "next/link";
import React from "react";

interface Props {
  organization: IOrganization;
}
export const Header = ({ organization }: Props) => {
  return (
    <Link href="/admin" className="px-4 lg:px-6 mb-8 flex items-center gap-3">
      <div className="w-10 h-10 shrink-0 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
        <img
          alt="Escudo Club Atlético Nacional"
          data-alt="Official shield of Club Atlético Nacional with blue and white stripes and clean graphic design"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOzevU-HI05ELDQVl1-yADSwYrrjUR1yGcDl1R8kWqoLrVK44tn50IAg16vFgkeFKsSkQKKsdZwjkrOlHCD_KdxKzjQMbHj6daW68zkfjl4wndcuF8EqTAOoipeKL_lg1nwyvG0x9bzDUfCChMierbMAJS50vYHsy6udIx2NyUvBPju04d0XPOCgwM9UeAPHd2oZxNyFz-JfFtEKO7PcfWIPW8IAGOennIfp-jHDY4lxyqBkKqEM1YwUcSKyyW7qq9lu9CgKmI0WVG"
        />
      </div>
      <div className="hidden lg:block logo-details">
        <h1 className="text-xl font-bold tracking-tight text-sky-700 dark:text-sky-400 font-headline">
          {organization.name}
        </h1>
        <p className="text-[10px] font-semibold Inter text-foreground/70 uppercase tracking-wider">
          Administración
        </p>
      </div>
    </Link>
  );
};
