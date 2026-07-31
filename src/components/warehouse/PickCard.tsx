import Card from "../ui/Card";

export interface ProductPickCardProps {
    name: string;
    sku: string;
    image: string;
    stock: number;
    onAdd: () => void;
}

export default function ProductPickCard({ name, sku, image, stock, onAdd }: ProductPickCardProps) {
    return (
        <Card className="h-100">
            <img
                src={image}
                alt={name}
                className="w-100 rounded-3 mb-2 bg-light"
                style={{ height: 110, objectFit: "cover" }}
            />
            <div className="fw-semibold text-dark">{name}</div>
            <div className="text-muted small mb-2">{sku}</div>

            <div className="d-flex justify-content-between align-items-center">
                <span className="text-success small fw-semibold">Tồn kho: {stock}</span>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 32, height: 32 }}
                    onClick={onAdd}
                >
                    <i className="bi bi-plus-lg" />
                </button>
            </div>
        </Card>
    );
}