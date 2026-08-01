import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/** Giữ header + sidebar sống khi một trang ném lỗi lúc render. */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Lỗi render trang:", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <Card shadow bordered={false} padding="p-5" className="text-center">
        <i className="bi bi-exclamation-triangle fs-1 text-warning d-block mb-3" />
        <h5 className="fw-bold mb-2">Đã có lỗi xảy ra</h5>
        <p className="text-secondary mb-1">
          Trang này không hiển thị được. Bạn thử tải lại, hoặc chọn mục khác ở
          menu bên trái.
        </p>
        <p className="text-secondary small font-monospace mb-4">
          {error.message}
        </p>
        <Button
          customVariant="primary"
          onClick={() => window.location.reload()}
        >
          Tải lại trang
        </Button>
      </Card>
    );
  }
}
