import { Wheat } from "lucide-react";
import StockItemListPage from "./StockItemListPage";
import { materials } from "../../mocks/stockItems";

export default function MaterialsPage() {
  return (
    <StockItemListPage
      title="Nguyên liệu"
      subtitle="Kho hàng · Nguyên liệu"
      icon={<Wheat size={24} />}
      idPrefix="NL"
      createLabel="Thêm nguyên liệu"
      itemLabel="nguyên liệu"
      searchPlaceholder="Tìm theo tên, mã, nhà cung cấp..."
      seed={materials}
    />
  );
}
