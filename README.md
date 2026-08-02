# TekShot OS

Giao diện quản lý cửa hàng (POS back office): đơn hàng, hàng hoá, kho, sổ quỹ, hoá đơn, nhân sự và báo cáo.

Hiện tại đây là **dự án giao diện** — toàn bộ dữ liệu đọc từ `src/mocks/`, chưa nối backend. Lọc, sắp xếp và phân trang đều chạy ở client; những chỗ sẽ thay bằng request đã được đánh dấu bằng comment trong code.

## Yêu cầu

Node >= 22 (xem [.nvmrc](.nvmrc), CI chạy Node 24).

```bash
npm install
npm run dev
```

## Lệnh

| Lệnh              | Việc                                                   |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Dev server Vite, có HMR                                |
| `npm run build`   | `tsc -b` (typecheck) rồi build production              |
| `npm run preview` | Chạy thử bản build trong `dist/`                       |
| `npm run lint`    | oxlint (**không phải** eslint)                         |
| `npm run format`  | Prettier ghi đè; `format:check` chỉ kiểm tra           |
| `npm test`        | Vitest chạy một lượt; `test:watch` để vừa sửa vừa chạy |

[CI](.github/workflows/ci.yml) chạy `format:check`, `lint`, `test` và `build` trên mỗi pull request.

## Công nghệ

Vite 8 · React 19 · TypeScript 6 (bật `strict`) · react-router-dom 7 · Bootstrap 5 qua react-bootstrap · recharts · Vitest.

TypeScript được cấu hình khắt khe: biến thừa, thiếu `import type`, hay dùng `enum` đều làm **hỏng build** chứ không chỉ cảnh báo.

## Cấu trúc

```
src/
  components/ui/      primitive dùng chung (Table, Input, Card, Button…)
  components/layout/  khung app: Header, Sidebar, MainLayout
  pages/<feature>/    mỗi màn hình là một thư mục, không phải một file
  mocks/              dữ liệu giả, lưu số và chuỗi ISO — không lưu text đã format
  types/  utils/  hooks/  constants/
```

Mỗi trang là một thư mục gồm một file compose mỏng và các file con cho từng vùng. Định dạng tiền và ngày đi qua [utils/format.ts](src/utils/format.ts) lúc render, không lưu sẵn trong mock.

Thêm một màn hình mới phải sửa **hai** file cho khớp nhau: [menuItems.tsx](src/components/layout/menuItems.tsx) (mỗi `id` chính là URL) và [AppRouter.tsx](src/Routes/AppRouter.tsx) (một `<Route>` + một dòng `lazy(() => import(…))`). Id không có route sẽ rơi vào `ComingSoonPage`.

## Giao diện

Chế độ sáng/tối chạy bằng `data-bs-theme` của Bootstrap 5.3. Mọi màu đi qua design token trong `:root` của [global.css](src/styles/global.css) — **không dùng** các class màu cố định như `bg-white`, `bg-light`, `text-dark`, vì chúng vỡ ở chế độ tối.

Chỉ CSS của Bootstrap được nạp, không có JS của Bootstrap: các thuộc tính `data-bs-*` sẽ không hoạt động, phải dùng component của react-bootstrap.

## Triển khai

Build tĩnh, deploy trên Vercel. [vercel.json](vercel.json) rewrite mọi path về `index.html` để router phía client xử lý.
