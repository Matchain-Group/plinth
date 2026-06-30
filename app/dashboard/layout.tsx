import { RequireRole } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireRole role="agent">
      {children}
    </RequireRole>
  );
}
