import InvoiceListPage from "./InvoiceListPage";
import { outboundInvoices } from "../../mocks/invoices";

export default function InvoiceOutPage() {
  return (
    <InvoiceListPage
      title="Hóa đơn đầu ra"
      subtitle="Quản lý và theo dõi tất cả hóa đơn bán hàng."
      invoices={outboundInvoices}
      createLabel="Thêm hóa đơn"
      submitLabel="Phát hành"
    />
  );
}
