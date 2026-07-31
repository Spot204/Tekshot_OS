import InvoiceListPage from "./InvoiceListPage";
import { inboundInvoices } from "../../mocks/invoices";

export default function InvoiceInPage() {
  return (
    <InvoiceListPage
      title="Hóa đơn đầu vào"
      subtitle="Quản lý và theo dõi hóa đơn mua hàng từ nhà cung cấp."
      invoices={inboundInvoices}
      createLabel="Thêm hóa đơn"
      submitLabel="Ghi nhận"
    />
  );
}
