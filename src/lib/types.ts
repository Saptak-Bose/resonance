import { LucideIcon } from "lucide-react";

export type MenuItem = {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
};

export type NavSectionProps = {
  label?: string;
  items: MenuItem[];
  pathname: string;
};

export type QuickAction = {
  title: string;
  description: string;
  gradient: string;
  href: string;
};
