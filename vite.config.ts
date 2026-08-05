import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Vite chặn Host lạ; cloudflared quick tunnel cấp domain *.trycloudflare.com
    allowedHosts: [".trycloudflare.com"],
  },
  test: {
    // Chỉ test lớp logic thuần, chưa có test component nên không cần jsdom
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
