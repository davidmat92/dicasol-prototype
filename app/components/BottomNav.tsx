"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bell, Clock, Settings } from "lucide-react";
import { getOpenAlerts } from "@/app/lib/mock-data";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/alerts", label: "Alarme", icon: Bell, showBadge: true },
  { href: "/history", label: "Verlauf", icon: Clock },
  { href: "/settings", label: "Einstellungen", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();
  const openCount = getOpenAlerts().length;

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 transition-colors duration-300"
      style={{
        background: "var(--bg-nav)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-around h-[68px] px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-1.5 relative transition-colors"
            >
              {/* Active dot indicator */}
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}

              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={
                    isActive ? "text-accent" : "text-text-tertiary"
                  }
                />
                {/* Badge for alerts */}
                {item.showBadge && openCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-danger text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {openCount}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] ${
                  isActive
                    ? "text-accent font-semibold"
                    : "text-text-tertiary font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
