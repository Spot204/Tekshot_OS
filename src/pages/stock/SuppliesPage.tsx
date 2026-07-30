import { Boxes } from "lucide-react";
import StockItemListPage from "./StockItemListPage";
import { supplies } from "../../mocks/stockItems";

export default function SuppliesPage() {
  return (
    <StockItemListPage
      title="Vật tư"
      subtitle="Hàng hóa · Vật tư"
      icon={<Boxes size={24} />}
      idPrefix="VT"
      createLabel="Thêm vật tư"
      itemLabel="vật tư"
      searchPlaceholder="Tìm theo tên, mã, nhà cung cấp..."
      seed={supplies}
    />
  );
}
