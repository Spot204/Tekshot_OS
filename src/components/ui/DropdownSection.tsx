import { useState } from "react";
import type { ReactNode } from "react";

export interface DropdownSectionProps {
    title: string;
    defaultOpen?: boolean;
    children: ReactNode;
}

export default function DropdownSection({ title, defaultOpen = false, children }: DropdownSectionProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border rounded-3 mb-3 overflow-hidden">
            <button
                type="button"
                className="btn w-100 d-flex justify-content-between align-items-center bg-primary-subtle text-primary fw-bold fs-5 border-0 rounded-0 py-2 px-3"
                onClick={() => setOpen((o) => !o)}
            >
                {title}
                <i className={`bi ${open ? "bi-chevron-up" : "bi-chevron-down"}`} />
            </button>

            {open && <div className="p-3">{children}</div>}
        </div>
    );
}