import type { Product } from "../types/product";

/** Dữ liệu mẫu — thay bằng service fetch khi có API */

type VariantRow = [name: string, skuSuffix: string, price: number, stock: number];

const build = (
  id: string,
  name: string,
  shortName: string,
  category: string,
  unit: string,
  skuPrefix: string,
  variants: VariantRow[],
): Product => ({
  id,
  name,
  shortName,
  category,
  unit,
  variants: variants.map(([variantName, skuSuffix, price, stock], index) => ({
    id: `${id}-${index + 1}`,
    name: variantName,
    sku: `${skuPrefix}-${skuSuffix}`,
    price,
    vat: 8,
    stock,
  })),
});

export const products: Product[] = [
  build("P001", "Áo bếp Pizza", "Áo bếp", "Áo bếp Pizza", "Chiếc", "BEPPIZZA", [
    ["Màu đen, Size XS", "XS", 235_000, 25],
    ["Màu đen, Size S", "S", 235_000, 18],
    ["Màu đen, Size M", "M", 235_000, 30],
    ["Màu đen, Size L", "L", 235_000, 12],
    ["Màu đen, Size XL", "XL", 235_000, 8],
    ["Màu đen, Size XXL", "XXL", 235_000, 5],
  ]),
  build("P002", "Áo đầu bếp", "Áo đầu bếp", "Áo đầu bếp", "Chiếc", "NB-ADB", [
    ["Màu trắng, Size M", "M", 310_000, 50],
    ["Màu trắng, Size L", "L", 310_000, 28],
  ]),
  build("P003", "Áo phục vụ", "Áo phục vụ", "Đồng phục", "Chiếc", "NB-APV", [
    ["Size M", "M", 185_000, 12],
    ["Size L", "L", 185_000, 8],
    ["Size XL", "XL", 185_000, 6],
  ]),
  build("P004", "Vỏ hộp pizza", "Vỏ hộp", "Bao bì", "Cái", "NB-VHP", [
    ["Cỡ M", "M", 6_500, 25],
    ["Cỡ L", "L", 8_000, 18],
  ]),
  build("P005", "Cốc trà sữa", "Cốc", "Bao bì", "Cái", "NB-CTS", [
    ["500ml", "500", 2_400, 64],
    ["700ml", "700", 3_100, 32],
  ]),
  build("P006", "Túi nilon", "Túi", "Bao bì", "Cái", "DC-TUI", [
    ["Loại lớn", "NILON", 900, 150],
  ]),
  build("P007", "Cà phê sữa đá", "Cà phê sữa", "Đồ uống", "Ly", "DU-CPS", [
    ["Size M", "M", 29_000, 0],
    ["Size L", "L", 35_000, 0],
  ]),
  build("P008", "Trà đào cam sả", "Trà đào", "Đồ uống", "Ly", "DU-TDCS", [
    ["Size M", "M", 39_000, 45],
    ["Size L", "L", 45_000, 22],
  ]),
];

/** Chỉ số tổng hợp phía server, không phải đếm từ mảng products */
export const productStats = {
  total: 1247,
  totalChange: 12.6,
  inventoryValue: 2_450_000_000,
  inventoryValueChange: 8.4,
  selling: 986,
  sellingChange: 10.3,
  lowStock: 72,
  lowStockChange: -4.2,
  stopped: 24,
  stoppedChange: -2.1,
};
