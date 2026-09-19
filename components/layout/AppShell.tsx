"use client";

import { useState } from "react";
import Link from "next/link";
import { IntroOverlay } from "./IntroOverlay";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <IntroOverlay />
      <div className="min-h-dvh lg:pl-[var(--sidebar-w)]">
        <div className="fixed inset-y-0 left-0 z-40 hidden w-[var(--sidebar-w)] border-r border-line lg:block">
          <Sidebar />
        </div>

        <header className="sticky top-0 z-[60] flex items-center justify-between border-b border-line bg-bg/80 px-5 py-3 backdrop-blur-md lg:hidden">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium">
            <Logo className="h-5 w-3.5" />
            {site.name}
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="relative flex h-10 w-10 items-center justify-center"
          >
            <span className="relative h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-px w-5 origin-center bg-fg transition-transform duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                  menuOpen
                    ? "-translate-y-1/2 rotate-45"
                    : "-translate-y-[7px]",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-px w-5 origin-center bg-fg transition-transform duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                  menuOpen
                    ? "-translate-y-1/2 -rotate-45"
                    : "translate-y-[7px]",
                )}
              />
            </span>
          </button>
        </header>

        <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

        <main className="min-h-dvh">{children}</main>
        <div aria-hidden className="edge-blur-bottom">
          <span className="l1" />
          <span className="l2" />
          <span className="l3" />
          <span className="frost" />
        </div>
      </div>
    </>
  );
}
