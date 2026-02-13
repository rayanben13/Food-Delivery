import AdminTabs from "./AdminTabs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminTabs />
      {children}
    </div>
  );
}
