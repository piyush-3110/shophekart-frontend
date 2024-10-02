import NavigationTabs from "@/components/products/shared/navigationTabs";
import { Separator } from "@/components/ui/separator";
import React from "react";

const CATEGORIES: { label: string }[] = [
  { label: "Technology" },
  { label: "Trinkets" },
  { label: "Digital items" },
  { label: "Clothes" },
  { label: "Electronics" },
];

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <main className="space-y-11">
      <div className="flex flex-wrap gap-x-5 gap-y-4 px-2 lg:px-32">
        {CATEGORIES.map(({ label }, index) => {
          return <span key={index}>{label}</span>;
        })}
      </div>
      <Separator color="#D7DDE7" />
      <NavigationTabs />
      <div className="px-2 lg:px-32">{children}</div>
    </main>
  );
};

export default Layout;
