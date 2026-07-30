import type {
  ActivityItem,
  ChannelRevenue,
  ComparisonGrain,
  ComparisonPoint,
  MetricChange,
  PerformanceMetric,
  RevenueGoal,
  TopProduct,
  TrendPoint,
} from "../types/report";

/** Dữ liệu mẫu — thay bằng service fetch khi có API */

export const reportRange = { from: "2026-07-21", to: "2026-07-27" };

export const totalRevenue = 399_000_000;
export const totalRevenueChange = 16.8;

export const revenueTrend: TrendPoint[] = [
  { date: "2026-07-01", value: 148_000_000 },
  { date: "2026-07-03", value: 162_000_000 },
  { date: "2026-07-05", value: 155_000_000 },
  { date: "2026-07-07", value: 189_000_000 },
  { date: "2026-07-09", value: 176_000_000 },
  { date: "2026-07-11", value: 213_000_000 },
  { date: "2026-07-13", value: 205_000_000 },
  { date: "2026-07-15", value: 248_000_000 },
  { date: "2026-07-17", value: 231_000_000 },
  { date: "2026-07-19", value: 286_000_000 },
  { date: "2026-07-21", value: 305_000_000 },
  { date: "2026-07-23", value: 292_000_000 },
  { date: "2026-07-25", value: 341_000_000 },
  { date: "2026-07-27", value: 399_000_000 },
];

export const performanceMetrics: PerformanceMetric[] = [
  {
    id: "orders",
    label: "Đơn hàng",
    value: 2458,
    unit: "number",
    changePercent: 12.4,
  },
  {
    id: "aov",
    label: "Giá trị trung bình/đơn",
    value: 162_350,
    unit: "currency",
    changePercent: 3.2,
  },
  {
    id: "customers",
    label: "Khách hàng",
    value: 1284,
    unit: "number",
    changePercent: 18.6,
  },
  {
    id: "products",
    label: "Sản phẩm đã bán",
    value: 3420,
    unit: "number",
    changePercent: 11.9,
  },
];

export const revenueGoal: RevenueGoal = {
  achieved: 399_000_000,
  target: 550_000_000,
};

/** Khoá theo chu kỳ để tab "Theo ngày / tuần / tháng" đổi được dữ liệu */
export const comparisonSeries: Record<ComparisonGrain, ComparisonPoint[]> = {
  day: [
    { date: "2026-07-21", current: 12_400_000, previous: 8_900_000 },
    { date: "2026-07-22", current: 31_200_000, previous: 21_400_000 },
    { date: "2026-07-23", current: 43_800_000, previous: 27_600_000 },
    { date: "2026-07-24", current: 62_450_000, previous: 52_800_000 },
    { date: "2026-07-25", current: 58_900_000, previous: 44_100_000 },
    { date: "2026-07-26", current: 71_300_000, previous: 49_700_000 },
    { date: "2026-07-27", current: 86_200_000, previous: 58_300_000 },
  ],
  week: [
    { date: "2026-06-29", current: 198_000_000, previous: 164_000_000 },
    { date: "2026-07-06", current: 246_000_000, previous: 203_000_000 },
    { date: "2026-07-13", current: 312_000_000, previous: 258_000_000 },
    { date: "2026-07-20", current: 356_000_000, previous: 291_000_000 },
    { date: "2026-07-27", current: 399_000_000, previous: 337_000_000 },
  ],
  month: [
    { date: "2026-03-01", current: 892_000_000, previous: 741_000_000 },
    { date: "2026-04-01", current: 1_045_000_000, previous: 868_000_000 },
    { date: "2026-05-01", current: 1_183_000_000, previous: 962_000_000 },
    { date: "2026-06-01", current: 1_326_000_000, previous: 1_098_000_000 },
    { date: "2026-07-01", current: 1_512_000_000, previous: 1_241_000_000 },
  ],
};

const sparkline = (values: number[]): TrendPoint[] =>
  values.map((value, index) => ({
    date: `2026-07-${String(21 + index).padStart(2, "0")}`,
    value,
  }));

export const metricChanges: MetricChange[] = [
  {
    id: "revenue",
    label: "Doanh thu",
    changePercent: 18.3,
    delta: 61_500_000,
    deltaUnit: "currency",
    color: "success",
    trend: sparkline([32, 28, 41, 38, 52, 47, 68]),
  },
  {
    id: "orders",
    label: "Đơn hàng",
    changePercent: 12.6,
    delta: 276,
    deltaUnit: "đơn",
    color: "brand",
    trend: sparkline([24, 38, 31, 46, 39, 58, 63]),
  },
  {
    id: "customers",
    label: "Khách hàng",
    changePercent: 21.4,
    delta: 227,
    deltaUnit: "khách",
    color: "purple",
    trend: sparkline([18, 26, 22, 35, 44, 39, 57]),
  },
];

export const channelRevenue: ChannelRevenue[] = [
  {
    id: "store",
    label: "Bán tại cửa hàng",
    amount: 271_320_000,
    percent: 68,
    color: "brand",
  },
  {
    id: "shopee",
    label: "ShopeeFood",
    amount: 71_820_000,
    percent: 18,
    color: "accent",
  },
  {
    id: "grab",
    label: "GrabFood",
    amount: 35_910_000,
    percent: 9,
    color: "success",
  },
  {
    id: "web",
    label: "Website / Khác",
    amount: 19_950_000,
    percent: 5,
    color: "muted",
  },
];

export const topProducts: TopProduct[] = [
  {
    id: "ca-phe-sua-da",
    name: "Cà phê sữa đá",
    emoji: "🧋",
    quantity: 428,
    unit: "ly",
    changePercent: 12.4,
  },
  {
    id: "banh-mi-chao",
    name: "Bánh mì chảo",
    emoji: "🍳",
    quantity: 392,
    unit: "phần",
    changePercent: 8.6,
  },
  {
    id: "tra-dao-cam-sa",
    name: "Trà đào cam sả",
    emoji: "🥤",
    quantity: 356,
    unit: "ly",
    changePercent: 15.2,
  },
  {
    id: "sinh-to-bo",
    name: "Sinh tố bơ",
    emoji: "🥑",
    quantity: 298,
    unit: "ly",
    changePercent: 10.8,
  },
  {
    id: "nuoc-ep-cam",
    name: "Nước ép cam",
    emoji: "🍹",
    quantity: 276,
    unit: "ly",
    changePercent: 9.3,
  },
];

/** Mốc thời gian tính lùi từ hiện tại để nhãn "x phút trước" luôn đúng */
const minutesAgo = (minutes: number): string =>
  new Date(Date.now() - minutes * 60_000).toISOString();

export const recentActivities: ActivityItem[] = [
  {
    id: "ORD-1048",
    kind: "order",
    title: "Đơn hàng #ORD-1048",
    detail: "320.000đ",
    at: minutesAgo(2),
  },
  {
    id: "stock-1",
    kind: "stock",
    title: "Nhập kho 20 sản phẩm",
    detail: "Cà phê sữa đá",
    at: minutesAgo(15),
  },
  {
    id: "cus-1",
    kind: "customer",
    title: "Khách hàng mới",
    detail: "Nguyễn Hoàng Nam",
    at: minutesAgo(60),
  },
  {
    id: "promo-1",
    kind: "promotion",
    title: "Chương trình khuyến mãi",
    detail: "Giảm 10% tất cả đồ uống",
    at: minutesAgo(120),
  },
];
