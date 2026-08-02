import Icon from "../../components/ui/Icon";
import StockItemListPage from "./StockItemListPage";
import { supplies } from "../../mocks/stockItems";

export default function SuppliesPage() {
  return (
    <StockItemListPage
      title="Vật tư"
      subtitle="Hàng hóa · Vật tư"
      icon={<Icon name="boxes" size={24} />}
      idPrefix="VT"
      createLabel="Thêm vật tư"
      itemLabel="vật tư"
      searchPlaceholder="Tìm theo tên, mã, nhà cung cấp..."
      seed={supplies}
    />
  );
}
