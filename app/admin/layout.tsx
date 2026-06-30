import { RequireRole } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireRole role="admin">
      {children}
    </RequireRole>
  );
}
