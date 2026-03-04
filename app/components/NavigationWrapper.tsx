"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Header from "./Header";
import BottomNav from "./BottomNav";

const HIDDEN_ROUTES = ["/login", "/family"];

export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const hideNav = HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const showNav = isAuthenticated && !hideNav;

  return (
    <>
      {showNav && <Header />}
      <main className={showNav ? "pb-24 min-h-[calc(100dvh-60px)]" : ""}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </>
  );
}
