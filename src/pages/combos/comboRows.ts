import type { Combo, ComboRow } from "../../types/combo";
import type { ProductRow } from "../../types/product";

/**
 * Giá gốc = tổng giá thành phần, tiết kiệm = giá gốc - giá combo.
 * Không lưu sẵn: sửa giá một biến thể thì mọi combo chứa nó phải đổi theo.
 */
export const toComboRows = (
  items: Combo[],
  variants: ProductRow[],
): ComboRow[] => {
  const byId = new Map(variants.map((variant) => [variant.id, variant]));

  return items.map((combo) => {
    const lines = combo.items.map((item) => {
      const variant = byId.get(item.variantId);
      return {
        ...item,
        name: variant?.productName ?? "Không còn tồn tại",
        sku: variant?.sku ?? "--",
        unitPrice: variant?.price ?? 0,
      };
    });

    const originalPrice = lines.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0,
    );
    const saving = originalPrice - combo.price;

    return {
      ...combo,
      lines,
      originalPrice,
      saving,
      // Giá gốc 0 nghĩa là thành phần đã bị xoá hết, tránh chia cho 0
      savingPercent: originalPrice
        ? Math.round((saving / originalPrice) * 100)
        : 0,
    };
  });
};
