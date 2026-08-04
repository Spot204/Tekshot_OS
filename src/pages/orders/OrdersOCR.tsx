import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import Icon from "../../components/ui/Icon";
import Button from "../../components/ui/Button";
import { createPortal } from "react-dom";

interface OrderOCRProps {
  onClose: () => void;
}

interface ImagePreview {
  id: string;
  file: File;
  url: string;
}

/** Component Popup Camera xử lý việc chụp ảnh */
function CameraPopup({
  onCapture,
  onClose,
}: {
  onCapture: (file: File) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Khởi động Camera khi mở popup
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        alert(
          "Không thể truy cập Camera. Vui lòng kiểm tra quyền trình duyệt.",
        );
        onClose();
      }
    }
    startCamera();

    // Tắt Camera khi đóng popup
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onClose]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], `capture_${Date.now()}.jpg`, {
                type: "image/jpeg",
              });
              onCapture(file);
            }
          },
          "image/jpeg",
          0.95,
        );
      }
    }
  };

  return createPortal(
    <div
      className="position-fixed top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.85)", zIndex: 10000 }}
    >
      <div
        className="rounded-4 overflow-hidden d-flex flex-column"
        style={{
          width: "90vw",
          maxWidth: "600px",
          backgroundColor: "#0f172a",
          color: "white",
        }}
      >
        <div className="p-3 d-flex justify-content-between align-items-center border-bottom border-secondary">
          <h5 className="fw-bold mb-0 text-primary">Chụp ảnh đơn hàng</h5>
          <button className="btn btn-link text-white p-0" onClick={onClose}>
            <Icon name="x-lg" size={20} />
          </button>
        </div>

        <div className="p-3">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-100 rounded-3 bg-black mb-3"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <canvas ref={canvasRef} className="d-none" />
          <div className="smaller text-secondary text-center opacity-75">
            Ảnh chụp sẽ được thêm ngay vào danh sách OCR để bạn xem lại trước
            khi gửi.
          </div>
        </div>

        <div className="p-3 d-flex justify-content-end gap-2 bg-dark bg-opacity-25">
          <button
            className="btn btn-primary px-4 rounded-3"
            style={{ backgroundColor: "#1e3a8a" }}
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="btn btn-success d-flex align-items-center gap-2 px-4 rounded-3"
            onClick={capturePhoto}
          >
            <Icon name="camera" size={18} /> Chụp ảnh
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function OrderOCR({ onClose }: OrderOCRProps) {
  const [tab, setTab] = useState<"image" | "text">("image");
  const [textContent, setTextContent] = useState("");
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Quản lý đóng mở Camera
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hàm helper để thêm ảnh vào danh sách
  const addImagesToList = (newFiles: File[]) => {
    const newImages: ImagePreview[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 10)); // Giới hạn 10 ảnh
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addImagesToList(Array.from(e.target.files));
  };

  const handleCapture = (file: File) => {
    addImagesToList([file]);
    setIsCameraOpen(false); // Đóng popup sau khi chụp
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((img) => img.id !== id);
    });
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return createPortal(
    <>
      <div
        className="position-fixed top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
        }}
      >
        <div
          className="app-surface app-shadow rounded-4 overflow-hidden d-flex flex-column"
          style={{ width: "95vw", maxWidth: "1200px", height: "90vh" }}
        >
          {/* Header */}
          <div
            className="p-3 border-bottom d-flex justify-content-between align-items-center"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <h5
              className="fw-bold mb-0 color-brand"
              style={{ color: "var(--brand)" }}
            >
              Đơn hàng
            </h5>
            <button
              className="btn btn-light rounded-circle p-2"
              onClick={onClose}
            >
              <Icon name="x-lg" size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-grow-1 overflow-auto p-4 app-shell">
            <div className="row h-100 g-4">
              <div className="col-lg-8 h-100">
                <div
                  className="app-surface rounded-4 p-4 h-100 border shadow-sm"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  {/* Tab Switcher */}
                  <div
                    className="d-inline-flex bg-light p-1 rounded-pill mb-4"
                    style={{ backgroundColor: "var(--surface-subtle)" }}
                  >
                    <button
                      className={`btn btn-sm rounded-pill px-4 border-0 ${tab === "image" ? "app-surface shadow-sm fw-bold" : "text-secondary"}`}
                      onClick={() => setTab("image")}
                    >
                      Ảnh
                    </button>
                    <button
                      className={`btn btn-sm rounded-pill px-4 border-0 ${tab === "text" ? "app-surface shadow-sm fw-bold" : "text-secondary"}`}
                      onClick={() => setTab("text")}
                    >
                      Text
                    </button>
                  </div>

                  {tab === "image" ? (
                    <div className="animate-fade-in">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="fw-bold color-brand mb-1">
                            Ảnh đơn hàng OCR
                          </h6>
                          <p className="text-secondary smaller mb-0">
                            Tải bill hoặc ảnh ghi order để AI đọc và chuẩn bị
                            draft order.
                          </p>
                        </div>
                        <button
                          className="btn btn-success d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                          onClick={() => setIsCameraOpen(true)}
                        >
                          <Icon name="camera" size={18} /> Chụp ảnh
                        </button>
                      </div>

                      <div className="d-flex justify-content-between smaller text-secondary mb-3">
                        <span>
                          Đã chọn <b>{images.length}</b> ảnh
                        </span>
                        <span>
                          Nhấn vào ảnh để xem phóng to hoặc dùng Ctrl+V để dán
                          ảnh
                        </span>
                      </div>

                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="d-none"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />

                      <div
                        onClick={triggerFileInput}
                        className="rounded-4 d-flex flex-column align-items-center justify-content-center p-3 text-center cursor-pointer position-relative"
                        style={{
                          border: "2px dashed var(--success)",
                          backgroundColor:
                            "color-mix(in srgb, var(--success) 3%, transparent)",
                          minHeight: images.length > 0 ? "auto" : "300px",
                          cursor: "pointer",
                        }}
                      >
                        {images.length === 0 ? (
                          <>
                            <Icon
                              name="image"
                              size={48}
                              className="text-secondary mb-3 opacity-50"
                            />
                            <div className="fw-bold mb-1 color-strong">
                              Kéo thả ảnh vào đây hoặc nhấn để chọn
                            </div>
                            <div className="smaller text-secondary">
                              Hỗ trợ JPG, PNG, WEBP - tối đa 10 ảnh - có thể
                              copy ảnh rồi nhấn Ctrl+V
                            </div>
                          </>
                        ) : (
                          <div
                            className="row g-2 w-100"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {images.map((img) => (
                              <div
                                key={img.id}
                                className="col-md-3 col-6 position-relative"
                              >
                                <div className="ratio ratio-1x1 rounded-3 overflow-hidden border">
                                  <img
                                    src={img.url}
                                    alt="preview"
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>
                                <button
                                  onClick={() => removeImage(img.id)}
                                  className="btn btn-danger btn-sm rounded-circle position-absolute"
                                  style={{
                                    top: -5,
                                    right: -5,
                                    padding: "2px 6px",
                                    zIndex: 10,
                                  }}
                                >
                                  <Icon name="x-lg" size={12} />
                                </button>
                              </div>
                            ))}
                            {images.length < 10 && (
                              <div className="col-md-3 col-6">
                                <div
                                  onClick={triggerFileInput}
                                  className="ratio ratio-1x1 rounded-3 border d-flex align-items-center justify-content-center bg-white bg-opacity-50"
                                  style={{
                                    borderStyle: "dashed",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Icon
                                    name="plus-lg"
                                    size={24}
                                    className="text-success"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Phần Text giữ nguyên */
                    <div className="animate-fade-in">
                      <h6 className="fw-bold color-brand mb-1">
                        Text đơn hàng OCR
                      </h6>
                      <p className="text-secondary smaller mb-3">
                        Dán nội dung tin nhắn hoặc đơn hàng để AI phân tích và
                        map lại menu.
                      </p>
                      <div className="d-flex justify-content-between smaller text-secondary mb-2">
                        <span>
                          Đã nhập <b>{textContent.length}</b> ký tự
                        </span>
                        <span className="fst-italic">
                          AI sẽ phân tích nội dung text rồi map lại menu
                        </span>
                      </div>
                      <textarea
                        className="form-control rounded-3 p-3"
                        rows={12}
                        style={{
                          resize: "none",
                          backgroundColor: "var(--app-surface)",
                        }}
                        placeholder="Ví dụ: chị Lan 2 trà sữa size L, 1 bánh flan, ít đá, giao lúc 7h tối..."
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar bên phải */}
              <div className="col-lg-4">
                <div
                  className="app-surface rounded-4 p-4 border shadow-sm h-100"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <h6 className="fw-bold mb-4 color-brand">
                    {tab === "image" ? "Gửi ảnh OCR" : "Phân tích text OCR"}
                  </h6>
                  <div className="d-flex flex-column gap-3 mb-4">
                    <div
                      className="d-flex gap-3 align-items-start p-3 rounded-3"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--brand) 5%, transparent)",
                      }}
                    >
                      <div className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary">
                        <Icon name="lightning-fill" size={18} />
                      </div>
                      <div>
                        <div className="smaller fw-bold color-strong">
                          Gửi và xử lý ngầm
                        </div>
                        <div
                          className="text-secondary"
                          style={{ fontSize: "11px" }}
                        >
                          AI tự động tạo đơn nháp, không cần chờ.
                        </div>
                      </div>
                    </div>
                    <div
                      className="d-flex gap-3 align-items-start p-3 rounded-3"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--success) 5%, transparent)",
                      }}
                    >
                      <div className="p-2 rounded-circle bg-success bg-opacity-10 text-success">
                        <Icon name="search" size={18} />
                      </div>
                      <div>
                        <div className="smaller fw-bold color-strong">
                          Gửi và kiểm tra
                        </div>
                        <div
                          className="text-secondary"
                          style={{ fontSize: "11px" }}
                        >
                          Xem lại kết quả OCR trước khi tạo đơn.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2 mt-auto">
                    <button
                      className="btn w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: "#8294c4", color: "white" }}
                    >
                      <Icon name="lightning-fill" size={16} /> Gửi và xử lý ngầm
                    </button>
                    <button
                      className="btn w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: "#8bcca3", color: "white" }}
                    >
                      <Icon name="search" size={16} /> Gửi và kiểm tra
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hiển thị Camera Popup lồng lên trên khi được kích hoạt */}
      {isCameraOpen && (
        <CameraPopup
          onCapture={handleCapture}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
    </>,
    document.body,
  );
}
