"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { usePlinth } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { getAgentByEmail } = usePlinth();
  const [role, setRole] = useState<"admin" | "agent">("agent");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (role === "admin" && email === "admin@plinth.ng") {
      login(email, "admin");
      router.push("/admin");
    } else if (role === "agent") {
      const agent = getAgentByEmail(email);
      if (agent && email === "agent@plinth.ng") {
        login(email, "agent", agent.id);
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Use demo account.");
      }
    } else {
      setError("Invalid credentials. Use demo account.");
    }
  };

  const useDemo = () => {
    if (role === "admin") {
      setEmail("admin@plinth.ng");
    } else {
      setEmail("agent@plinth.ng");
    }
  };

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-sm border border-white/10 bg-surface2 p-8">
          <h1 className="mb-2 font-display text-2xl text-paper">Login</h1>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-widest2 text-sand/50">
            Demo Portfolio Build
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-sand/70">
                Role
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRole("agent")}
                  className={`flex-1 rounded-sm border px-4 py-3 font-mono text-sm transition ${
                    role === "agent"
                      ? "border-amber bg-amber/10 text-amber"
                      : "border-white/20 bg-surface text-sand/70 hover:border-white/40"
                  }`}
                >
                  Agent
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex-1 rounded-sm border px-4 py-3 font-mono text-sm transition ${
                    role === "admin"
                      ? "border-amber bg-amber/10 text-amber"
                      : "border-white/20 bg-surface text-sand/70 hover:border-white/40"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-sand/70">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "admin" ? "admin@plinth.ng" : "agent@plinth.ng"}
                className="w-full rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand focus:border-amber focus:outline-none"
              />
            </div>

            {error && (
              <p className="font-mono text-sm text-red-400">{error}</p>
            )}

            <button
              type="button"
              onClick={useDemo}
              className="w-full rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand transition hover:border-amber hover:text-amber"
            >
              Use Demo Account
            </button>

            <button
              type="submit"
              className="w-full rounded-sm bg-amber px-4 py-3 font-mono text-sm uppercase tracking-widest2 text-ink transition hover:bg-amber/90"
            >
              Login
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="font-mono text-[10px] text-sand/50">
              Demo credentials: admin@plinth.ng or agent@plinth.ng
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
