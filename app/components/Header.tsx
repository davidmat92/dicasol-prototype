"use client";

import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { getCriticalAlerts } from "@/app/lib/mock-data";

export default function Header() {
  const hasUnread = getCriticalAlerts().length > 0;

  return (
    <header
      className="sticky top-0 z-40 transition-colors duration-300"
      style={{
        background: "var(--bg-header)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-between px-4 h-[60px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-base tracking-tight">
              D
            </span>
          </div>
          <div>
            <span className="font-bold text-[17px] tracking-tight text-text-primary block leading-tight">
              DICASOL
            </span>
            <span className="text-[10px] text-text-tertiary font-medium leading-tight">
              Pflege-Monitoring
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="relative p-2.5 rounded-2xl transition-colors"
            style={{ background: "var(--bg-elevated)" }}
          >
            <Search size={20} className="text-text-secondary" />
          </Link>
          <Link
            href="/alerts"
            className="relative p-2.5 rounded-2xl transition-colors"
            style={{ background: "var(--bg-elevated)" }}
          >
            <Bell size={20} className="text-text-secondary" />
            {hasUnread && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger rounded-full animate-breathe" />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
