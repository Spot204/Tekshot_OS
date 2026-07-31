import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

/** Khung app. Offset lấy từ --header-h / --sidebar-w, trang con không tự bù. */
export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Đổi trang thì đóng sidebar (chỉ có tác dụng ở mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="app-shell min-vh-100">
      <Header onToggleSidebar={() => setIsSidebarOpen((open) => !open)} />

      <Sidebar
        isOpen={isSidebarOpen}
        onNavigate={() => setIsSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <div
          className="app-sidebar-backdrop d-lg-none"
          role="presentation"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="app-main">{children}</main>
    </div>
  );
}
