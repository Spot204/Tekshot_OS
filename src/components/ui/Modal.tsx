import type { ReactNode } from "react";
import { Modal as BsModal } from "react-bootstrap";

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: "sm" | "lg" | "xl";
}

export default function Modal({ open, onClose, title, children, footer, size }: ModalProps) {
    return (
        <BsModal
            show={open}
            onHide={onClose}
            size={size}
            centered
            scrollable
            contentClassName="rounded-4 border-0"
        >
            <BsModal.Header closeButton className="border-0 pb-0">
                <BsModal.Title className="fs-4 fw-bold">{title}</BsModal.Title>
            </BsModal.Header>

            <BsModal.Body>{children}</BsModal.Body>

            {footer && <BsModal.Footer className="border-0">{footer}</BsModal.Footer>}
        </BsModal>
    );
}