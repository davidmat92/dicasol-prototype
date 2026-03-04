"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: "pflege" | "angehoerig";
  login: () => void;
  logout: () => void;
  setUserRole: (role: "pflege" | "angehoerig") => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: "pflege",
  login: () => {},
  logout: () => {},
  setUserRole: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"pflege" | "angehoerig">("pflege");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("dicasol-auth");
    const storedRole = localStorage.getItem("dicasol-role") as
      | "pflege"
      | "angehoerig"
      | null;
    if (stored === "true") {
      setIsAuthenticated(true);
    }
    if (storedRole === "pflege" || storedRole === "angehoerig") {
      setUserRole(storedRole);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Redirect to login if not authenticated and not already on login page
    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, mounted, router]);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("dicasol-auth", "true");
    if (userRole === "angehoerig") {
      router.replace("/family");
    } else {
      router.replace("/");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("dicasol-auth");
    router.replace("/login");
  };

  const handleSetRole = (role: "pflege" | "angehoerig") => {
    setUserRole(role);
    localStorage.setItem("dicasol-role", role);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        login,
        logout,
        setUserRole: handleSetRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
