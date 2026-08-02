import Icon from "../../components/ui/Icon";
import StockItemListPage from "./StockItemListPage";
import { materials } from "../../mocks/stockItems";

export default function MaterialsPage() {
  return (
    <StockItemListPage
      title="Nguyên liệu"
      subtitle="Kho hàng · Nguyên liệu"
      icon={<Icon name="basket" size={24} />}
      idPrefix="NL"
      createLabel="Thêm nguyên liệu"
      itemLabel="nguyên liệu"
      searchPlaceholder="Tìm theo tên, mã, nhà cung cấp..."
      seed={materials}
    />
  );
}
