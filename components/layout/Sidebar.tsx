"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  AppWindow,
  ArrowUpRight,
  AtSign,
  Code2,
  Compass,
  FileText,
  FolderKanban,
  Globe,
  Mail,
} from "lucide-react";
import { BrandLockup } from "./BrandLockup";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";

const icons = {
  layers: FolderKanban,
  app: AppWindow,
  globe: Globe,
  compass: Compass,
} as const;

type SidebarProps = {
  onNavigate?: () => void;
  layoutPrefix?: string;
};

export function Sidebar({ onNavigate, layoutPrefix = "desktop" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full min-h-0 flex-col bg-sidebar px-6 py-7">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center text-[15px] font-medium tracking-tight text-fg"
      >
        <BrandLockup />
      </Link>

      <nav className="mt-10 flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto pr-1">
        <NavLink
          href={nav.about.href}
          active={pathname === "/about"}
          onClick={onNavigate}
          layoutPrefix={layoutPrefix}
        >
          <span className="relative h-4 w-4 overflow-hidden rounded-full border border-white/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.portrait}
              alt=""
              className="h-full w-full object-cover object-[50%_22%]"
            />
          </span>
          {nav.about.label}
        </NavLink>

        {nav.groups.map((group) => (
          <div key={group.label}>
            <p className="mb-3 text-[11px] font-medium text-dim">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = icons[item.icon];
                const active =
                  item.href === "/#case-studies"
                    ? pathname.startsWith("/interface") || pathname === "/"
                    : pathname === item.href;
                return (
                  <li key={item.label}>
                    <NavLink
                      href={item.href}
                      active={active}
                      onClick={onNavigate}
                      layoutPrefix={layoutPrefix}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-3 text-[11px] font-medium text-dim">
            Links
          </p>
          <ul className="space-y-0.5">
            {nav.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-lg px-2 py-1.5 text-[13.5px] text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
                >
                  <span className="flex items-center gap-2.5">
                    <SocialIcon label={item.label} />
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-70" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <p className="mt-8 text-[11px] leading-relaxed text-dim">
        © {site.legalName}, {site.year}
      </p>
    </aside>
  );
}

function NavLink({
  href,
  active,
  children,
  onClick,
  layoutPrefix,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  layoutPrefix: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13.5px] transition-colors",
        active ? "text-fg" : "text-muted hover:bg-white/[0.04] hover:text-fg",
      )}
    >
      {active ? (
        <motion.span
          layoutId={`${layoutPrefix}-nav-pill`}
          className="absolute inset-0 rounded-lg bg-white/[0.06]"
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
      ) : null}
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </Link>
  );
}

function SocialIcon({ label }: { label: string }) {
  const cls = "h-3.5 w-3.5";
  if (label === "Email") return <Mail className={cls} strokeWidth={1.6} />;
  if (label === "Resume") return <FileText className={cls} strokeWidth={1.6} />;
  if (label === "LinkedIn") return <AtSign className={cls} strokeWidth={1.6} />;
  if (label === "Github") return <Code2 className={cls} strokeWidth={1.6} />;
  return null;
}
