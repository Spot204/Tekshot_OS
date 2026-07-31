import SectionCard from "./SectionCard";
import SectionLink from "./SectionLink";
import ChangeBadge from "./ChangeBadge";
import { formatNumber } from "../../utils/format";
import { topProducts } from "../../mocks/report";

/** Bảng xếp hạng sản phẩm, thanh tiến độ tính theo sản phẩm bán chạy nhất */
export default function TopProducts() {
  const best = Math.max(...topProducts.map((product) => product.quantity));

  return (
    <SectionCard
      title="Top sản phẩm bán chạy"
      action={<SectionLink label="Xem tất cả" />}
      className="h-100"
    >
      <ol className="list-unstyled d-flex flex-column gap-3 mb-0">
        {topProducts.map((product, index) => (
          <li key={product.id} className="d-flex align-items-center gap-3">
            <span className="report-rank">{index + 1}</span>
            <span style={{ fontSize: "1.25rem" }} aria-hidden="true">
              {product.emoji}
            </span>

            <div className="flex-grow-1 min-w-0">
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="small fw-semibold text-truncate me-auto">
                  {product.name}
                </span>
                <span className="small text-secondary text-nowrap">
                  {formatNumber(product.quantity)} {product.unit}
                </span>
                <ChangeBadge percent={product.changePercent} />
              </div>

              <div className="report-bar">
                <div
                  className="report-bar-fill"
                  style={{ width: `${(product.quantity / best) * 100}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}
