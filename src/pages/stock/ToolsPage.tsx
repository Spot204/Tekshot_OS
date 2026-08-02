import Icon from "../../components/ui/Icon";
import StockItemListPage from "./StockItemListPage";
import { tools } from "../../mocks/stockItems";

export default function ToolsPage() {
  return (
    <StockItemListPage
      title="Dụng cụ"
      subtitle="Kho hàng · Dụng cụ"
      icon={<Icon name="wrench" size={24} />}
      idPrefix="DC"
      createLabel="Thêm dụng cụ"
      itemLabel="dụng cụ"
      searchPlaceholder="Tìm theo tên hoặc mã dụng cụ..."
      seed={tools}
      showSupplier={false}
    />
  );
}
