export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
      {children}
    </div>
  );
}
