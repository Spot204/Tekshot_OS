import { useRef, useState } from "react";
import { CloudUpload, X } from "lucide-react";

const ACCEPT = ".jpg,.png,.pdf,.xls,.xlsx";
const MAX_BYTES = 10 * 1024 * 1024;

interface FileDropzoneProps {
  files: File[];
  onChange: (files: File[]) => void;
}

/** Chỉ giữ file trong state — chưa có backend để tải lên */
export default function FileDropzone({ files, onChange }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const accept = (incoming: FileList | null) => {
    if (!incoming?.length) return;

    const list = [...incoming];
    const tooBig = list.find((file) => file.size > MAX_BYTES);
    setError(tooBig ? `"${tooBig.name}" vượt quá 10MB` : "");
    onChange([...files, ...list.filter((file) => file.size <= MAX_BYTES)]);
  };

  return (
    <div>
      <div
        className={`voucher-dropzone${dragging ? " is-dragging" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          accept(event.dataTransfer.files);
        }}
      >
        <CloudUpload size={24} className="text-secondary" aria-hidden="true" />
        <span className="text-secondary small">Kéo thả file vào đây hoặc</span>

        <button
          type="button"
          className="btn btn-brand btn-sm"
          onClick={() => inputRef.current?.click()}
        >
          Chọn file
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT}
          className="d-none"
          onChange={(event) => accept(event.target.files)}
        />

        <span
          className="text-secondary"
          style={{ fontSize: "var(--fs-micro)" }}
        >
          Định dạng: .jpg, .png, .pdf, .xls, .xlsx (≤ 10MB)
        </span>
      </div>

      {error && <div className="text-danger small mt-2">{error}</div>}

      {files.length > 0 && (
        <ul className="list-unstyled mt-2 mb-0 d-flex flex-column gap-1">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="d-flex align-items-center gap-2 small"
            >
              <span className="text-truncate me-auto">{file.name}</span>
              <button
                type="button"
                className="app-icon-toggle text-danger"
                aria-label={`Bỏ ${file.name}`}
                onClick={() => onChange(files.filter((_, i) => i !== index))}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
