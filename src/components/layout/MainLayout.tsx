import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Khung của app: header cố định trên, sidebar cố định trái, nội dung ở giữa.
 *
 * Chiều cao header và bề rộng sidebar khai báo bằng CSS variable trong
 * global.css (--header-h, --sidebar-w) và dùng qua các class .app-*, nên
 * offset của ba phần luôn khớp nhau. Trang con chỉ render nội dung, không
 * cần tự bù margin/padding.
 */
export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Đổi trang thì đóng sidebar (chỉ có tác dụng ở mobile, nơi nó là off-canvas)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-vh-100 bg-light">
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
