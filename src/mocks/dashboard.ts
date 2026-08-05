import type {
  MetricSummary,
  PageMetric,
  SidebarChange,
  PerformanceStat,
} from "../types/dashboard";

export const summaryMetrics: MetricSummary[] = [
  { label: "Lượt xem", value: "64.067", trend: -3.1 },
  {
    label: "Người xem",
    value: "19.503",
    trend: 23.9,
    note: "≈ có thể đếm trùng người theo nhiều trang",
  },
  { label: "Lượt truy cập", value: "4.393", trend: -21.2 },
  { label: "Lượt theo dõi", value: "86", trend: -56.1 },
];

export const pagesData: PageMetric[] = [
  {
    id: "1",
    name: "Kí sự sản phẩm",
    views: 10,
    viewers: 4,
    visits: 7,
    followers: 0,
  },
  {
    id: "2",
    name: "UBOT Việt Nam",
    views: 321,
    viewers: 125,
    visits: 20,
    followers: 0,
  },
  {
    id: "3",
    name: "Buildtek",
    views: 604,
    viewers: 124,
    visits: 108,
    followers: 2,
  },
  {
    id: "4",
    name: "LPC",
    views: 7719,
    viewers: 3653,
    visits: 431,
    followers: 8,
  },
];

export const sidebarChanges: SidebarChange[] = [
  {
    label: "Doanh thu",
    growth: "+18,3%",
    valueChange: "+61.500.000đ",
    icon: "payments",
    color: "success",
  },
  {
    label: "Đơn hàng",
    growth: "+12,4%",
    valueChange: "+275 đơn hàng",
    icon: "shopping_cart",
    color: "primary",
  },
];

export const performanceStats: PerformanceStat[] = [
  {
    label: "Đơn hàng",
    value: "2.458",
    trend: "12,4%",
    icon: "shopping_cart",
    color: "blue",
  },
  {
    label: "Giá trị trung bình/đơn",
    value: "162.350đ",
    trend: "3,2%",
    icon: "receipt",
    color: "indigo",
  },
  {
    label: "Khách hàng",
    value: "1.284",
    trend: "18,6%",
    icon: "person",
    color: "purple",
  },
  {
    label: "Sản phẩm đã bán",
    value: "3.420",
    trend: "11,9%",
    icon: "inventory_2",
    color: "info",
  },
];
