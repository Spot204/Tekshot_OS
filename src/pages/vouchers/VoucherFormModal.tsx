import { useMemo, useState } from "react";
import { Collapse, Modal } from "react-bootstrap";
import { ChevronDown, FileText } from "lucide-react";
import type { CashFlow, PaymentMethod, VoucherLine } from "../../types/cashbook";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import VoucherLineTable from "./VoucherLineTable";
import { emptyLine } from "./voucherLine";
import FileDropzone from "./FileDropzone";
import { PAYMENT_OPTIONS, VOUCHER_KIND_OPTIONS } from "../../constants/cashbook";
import { formatCurrency } from "../../utils/format";

const AGENCY_OPTIONS = [
  { value: "foodtek", label: "Foodtek (6)" },
  { value: "foodtek-2", label: "Foodtek Quận 2 (3)" },
];

export interface VoucherDraft {
  title: string;
  agency: string;
  flow: CashFlow;
  method: PaymentMethod;
  lines: VoucherLine[];
  total: number;
}

interface VoucherFormModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (draft: VoucherDraft) => void;
}

type Errors = Partial<Record<"title" | "flow" | "method" | "lines", string>>;

export default function VoucherFormModal({
  show,
  onClose,
  onSubmit,
}: VoucherFormModalProps) {
  const [title, setTitle] = useState("");
  const [agency, setAgency] = useState(AGENCY_OPTIONS[0].value);
  const [flow, setFlow] = useState("");
  const [method, setMethod] = useState("");
  const [lines, setLines] = useState<VoucherLine[]>([emptyLine("line-1")]);
  const [files, setFiles] = useState<File[]>([]);
  const [showFiles, setShowFiles] = useState(true);
  const [errors, setErrors] = useState<Errors>({});

  // Tổng tiền luôn cộng từ các dòng, không cho nhập tay
  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.amount, 0),
    [lines],
  );

  const clearError = (key: keyof Errors) =>
    setErrors(({ [key]: _removed, ...rest }) => rest);

  const close = () => {
    setTitle("");
    setAgency(AGENCY_OPTIONS[0].value);
    setFlow("");
    setMethod("");
    setLines([emptyLine("line-1")]);
    setFiles([]);
    setErrors({});
    onClose();
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const found: Errors = {};
    if (!title.trim()) found.title = "Chưa nhập tiêu đề";
    if (!flow) found.flow = "Chưa chọn loại phiếu";
    if (!method) found.method = "Chưa chọn kiểu thanh toán";
    if (total <= 0) found.lines = "Cần ít nhất một dòng có thành tiền lớn hơn 0";

    setErrors(found);
    if (Object.keys(found).length) return;

    onSubmit({
      title: title.trim(),
      agency,
      flow: flow as CashFlow,
      method: method as PaymentMethod,
      lines: lines.filter((line) => line.amount > 0),
      total,
    });
    close();
  };

  return (
    <Modal show={show} onHide={close} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="h5 fw-bold">Tạo phiếu thu chi</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form id="voucher-form" onSubmit={submit} noValidate>
          <div className="voucher-section-bar mb-4">
            <FileText size={18} aria-hidden="true" />
            <span className="fw-semibold">Thông tin chung</span>
          </div>

          <div className="row g-4">
            <div className="col-lg-7">
              <VoucherLineTable
                lines={lines}
                onChange={(next) => {
                  setLines(next);
                  clearError("lines");
                }}
              />
              {errors.lines && (
                <div className="text-danger small mt-2">{errors.lines}</div>
              )}
            </div>

            <div className="col-lg-5 d-flex flex-column gap-3">
              <div>
                <label htmlFor="voucher-title" className="form-label fw-semibold">
                  Tiêu đề <span className="text-danger">*</span>
                </label>
                <Input
                  id="voucher-title"
                  placeholder="Nhập tiêu đề"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    clearError("title");
                  }}
                  state={errors.title ? "error" : "none"}
                  message={errors.title}
                />
              </div>

              <div>
                <label htmlFor="voucher-agency" className="form-label fw-semibold">
                  Đại lý
                </label>
                <ComboBox
                  id="voucher-agency"
                  options={AGENCY_OPTIONS}
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="voucher-kind" className="form-label fw-semibold">
                  Loại phiếu <span className="text-danger">*</span>
                </label>
                <ComboBox
                  id="voucher-kind"
                  options={VOUCHER_KIND_OPTIONS}
                  value={flow}
                  onChange={(e) => {
                    setFlow(e.target.value);
                    clearError("flow");
                  }}
                  state={errors.flow ? "error" : "none"}
                  message={errors.flow}
                />
              </div>

              <div>
                <label htmlFor="voucher-method" className="form-label fw-semibold">
                  Kiểu thanh toán <span className="text-danger">*</span>
                </label>
                <ComboBox
                  id="voucher-method"
                  options={PAYMENT_OPTIONS}
                  value={method}
                  onChange={(e) => {
                    setMethod(e.target.value);
                    clearError("method");
                  }}
                  state={errors.method ? "error" : "none"}
                  message={errors.method}
                />
              </div>

              <div>
                <label htmlFor="voucher-total" className="form-label fw-semibold">
                  Tổng tiền
                </label>
                <Input
                  id="voucher-total"
                  readOnly
                  value={formatCurrency(total)}
                  aria-label="Tổng tiền, tính từ các dòng nội dung"
                />
              </div>

              <div className="border rounded-3">
                <button
                  type="button"
                  className="voucher-collapse-toggle"
                  aria-expanded={showFiles}
                  onClick={() => setShowFiles((open) => !open)}
                >
                  <ChevronDown
                    size={16}
                    className={showFiles ? undefined : "menu-chevron is-collapsed"}
                    aria-hidden="true"
                  />
                  Tệp đính kèm
                </button>

                <Collapse in={showFiles}>
                  <div>
                    <div className="p-3 pt-0">
                      <FileDropzone files={files} onChange={setFiles} />
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button customVariant="secondary" onClick={close}>
          Hủy
        </Button>
        <Button type="submit" form="voucher-form">
          Lưu phiếu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
