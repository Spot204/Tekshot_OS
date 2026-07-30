import type { StockItem, StockItemKind } from "../types/stockItem";

/** Dữ liệu mẫu — thay bằng service fetch khi có API */

type Row = [
  name: string,
  unit: string,
  stock: number,
  minStock: number,
  price: number,
  supplier: string,
  location: string,
  day: number,
];

const PREFIX: Record<StockItemKind, string> = {
  supply: "VT",
  material: "NL",
  tool: "DC",
};

const build = (kind: StockItemKind, rows: Row[]): StockItem[] =>
  rows.map(
    (
      [name, unit, stock, minStock, price, supplier, location, day],
      index,
    ) => ({
      id: `${PREFIX[kind]}-${String(index + 1).padStart(3, "0")}`,
      name,
      unit,
      stock,
      minStock,
      price,
      supplier,
      location,
      updatedAt: `2026-07-${String(day).padStart(2, "0")}T09:00`,
    }),
  );

export const supplies: StockItem[] = build("supply", [
  ["Vỏ hộp pizza cỡ M", "Cái", 250, 100, 6_500, "Công ty TNHH Bao bì Việt", "Kho chính", 28],
  ["Vỏ hộp pizza cỡ L", "Cái", 80, 100, 8_000, "Công ty TNHH Bao bì Việt", "Kho chính", 27],
  ["Cốc trà sữa 500ml", "Cái", 640, 200, 2_400, "Công ty CP Nhựa An Phát", "Kho chính", 27],
  ["Cốc trà sữa 700ml", "Cái", 320, 200, 3_100, "Công ty CP Nhựa An Phát", "Kho chính", 26],
  ["Túi nilon loại lớn", "Cái", 1_500, 500, 900, "Cơ sở Bao bì Minh Anh", "Kho chính", 26],
  ["Ống hút giấy", "Cái", 0, 300, 450, "Cơ sở Bao bì Minh Anh", "Kho Chi nhánh 1", 25],
  ["Nắp cốc nhựa", "Cái", 180, 200, 700, "Công ty CP Nhựa An Phát", "Kho Chi nhánh 1", 25],
  ["Hộp giấy đựng cơm", "Cái", 420, 150, 4_200, "Công ty TNHH Bao bì Việt", "Kho Chi nhánh 2", 24],
  ["Giấy in hóa đơn K80", "Cuộn", 45, 20, 12_000, "Văn phòng phẩm Hồng Hà", "Kho chính", 24],
  ["Khăn giấy ăn", "Gói", 96, 50, 8_500, "Văn phòng phẩm Hồng Hà", "Kho chính", 23],
  ["Găng tay nilon", "Hộp", 12, 20, 25_000, "Cơ sở Bao bì Minh Anh", "Kho nguyên liệu", 23],
  ["Màng bọc thực phẩm", "Cuộn", 30, 15, 32_000, "Công ty CP Nhựa An Phát", "Kho nguyên liệu", 22],
]);

export const materials: StockItem[] = build("material", [
  ["Bột mì số 13", "Kg", 180, 50, 22_000, "Công ty CP Nguyên liệu Sài Gòn", "Kho nguyên liệu", 28],
  ["Phô mai Mozzarella", "Kg", 42, 30, 245_000, "Công ty TNHH Thực phẩm ABC", "Kho nguyên liệu", 28],
  ["Sốt cà chua", "Lít", 65, 30, 58_000, "Công ty TNHH Thực phẩm ABC", "Kho nguyên liệu", 27],
  ["Xúc xích Ý", "Kg", 18, 20, 320_000, "Công ty TNHH Thực phẩm ABC", "Kho nguyên liệu", 27],
  ["Cà phê hạt Robusta", "Kg", 95, 40, 185_000, "Công ty CP Cà phê Buôn Ma Thuột", "Kho chính", 26],
  ["Sữa đặc có đường", "Hộp", 120, 60, 24_500, "Công ty CP Nguyên liệu Sài Gòn", "Kho chính", 26],
  ["Trà đen", "Kg", 0, 15, 165_000, "Công ty CP Trà Thái Nguyên", "Kho nguyên liệu", 25],
  ["Đào ngâm", "Hũ", 34, 20, 78_000, "Công ty TNHH Thực phẩm ABC", "Kho nguyên liệu", 25],
  ["Đường cát trắng", "Kg", 210, 80, 19_000, "Công ty CP Nguyên liệu Sài Gòn", "Kho chính", 24],
  ["Bơ lạt", "Kg", 26, 30, 210_000, "Công ty TNHH Thực phẩm ABC", "Kho nguyên liệu", 24],
  ["Trân châu đen", "Kg", 55, 25, 62_000, "Công ty CP Nguyên liệu Sài Gòn", "Kho chính", 23],
  ["Siro đường đen", "Lít", 40, 20, 95_000, "Công ty CP Nguyên liệu Sài Gòn", "Kho chính", 23],
]);

export const tools: StockItem[] = build("tool", [
  ["Lò nướng pizza 2 tầng", "Cái", 3, 2, 42_000_000, "Công ty Thiết bị Bếp Á Âu", "Kho chính", 28],
  ["Máy pha cà phê", "Cái", 2, 2, 68_000_000, "Công ty Thiết bị Bếp Á Âu", "Kho chính", 27],
  ["Máy xay sinh tố công nghiệp", "Cái", 4, 2, 8_500_000, "Công ty Thiết bị Bếp Á Âu", "Kho chính", 27],
  ["Tủ mát 2 cánh", "Cái", 2, 1, 22_000_000, "Điện máy Thành Đạt", "Kho chính", 26],
  ["Cân điện tử 5kg", "Cái", 6, 3, 850_000, "Điện máy Thành Đạt", "Kho Chi nhánh 1", 26],
  ["Dao cắt pizza", "Cái", 14, 6, 180_000, "Cửa hàng Dụng cụ Bếp Sài Gòn", "Kho Chi nhánh 1", 25],
  ["Khay inox 40x60", "Cái", 28, 10, 240_000, "Cửa hàng Dụng cụ Bếp Sài Gòn", "Kho Chi nhánh 2", 25],
  ["Bình shaker pha chế", "Cái", 8, 10, 165_000, "Cửa hàng Dụng cụ Bếp Sài Gòn", "Kho Chi nhánh 2", 24],
  ["Máy in hóa đơn", "Cái", 5, 3, 3_200_000, "Điện máy Thành Đạt", "Kho chính", 24],
  ["Máy quét mã vạch", "Cái", 0, 2, 1_450_000, "Điện máy Thành Đạt", "Kho dự phòng", 23],
]);
