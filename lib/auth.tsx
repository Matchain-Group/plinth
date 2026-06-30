"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface Session {
  email: string;
  role: "admin" | "agent";
  agentId?: string;
}

interface AuthContextType {
  session: Session | null;
  login: (email: string, role: "admin" | "agent", agentId?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedSession = localStorage.getItem("plinth_session");
    if (savedSession) {
      try {
        setSession(JSON.parse(savedSession));
      } catch (e) {
        console.error("Error parsing session:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  const login = (email: string, role: "admin" | "agent", agentId?: string) => {
    const newSession: Session = { email, role, agentId };
    setSession(newSession);
    localStorage.setItem("plinth_session", JSON.stringify(newSession));
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("plinth_session");
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function RequireRole({ role, children }: { role: "admin" | "agent"; children: ReactNode }) {
  const { session, isAuthenticated } = useAuth();

  if (!isAuthenticated || session?.role !== role) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return <>{children}</>;
}
