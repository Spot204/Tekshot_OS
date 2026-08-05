import ComboBox from "../../components/ui/ComboBox";
import { INDUSTRIES, INDUSTRY_OPTIONS } from "../../constants/product";

export interface CategoryValue {
  industry: string;
  group: string;
  kind: string;
}

interface CascadingCategoryProps {
  value: CategoryValue;
  onChange: (value: CategoryValue) => void;
}

const toOptions = (values: string[]) =>
  values.map((value) => ({ value, label: value }));

/**
 * Ngành hàng -> nhóm hàng -> loại hàng.
 * Đổi cấp trên phải xoá cấp dưới, nếu không sẽ còn lại lựa chọn không thuộc
 * nhánh mới và lưu ra dữ liệu vô nghĩa.
 */
export default function CascadingCategory({
  value,
  onChange,
}: CascadingCategoryProps) {
  const groups = value.industry ? Object.keys(INDUSTRIES[value.industry]) : [];
  const kinds =
    value.industry && value.group
      ? INDUSTRIES[value.industry][value.group]
      : [];

  return (
    <>
      <div className="col-md-4">
        <label htmlFor="product-industry" className="form-label fw-semibold">
          Ngành hàng
        </label>
        <ComboBox
          id="product-industry"
          options={INDUSTRY_OPTIONS}
          value={value.industry}
          onChange={(e) =>
            onChange({ industry: e.target.value, group: "", kind: "" })
          }
        />
      </div>

      <div className="col-md-4">
        <label htmlFor="product-group" className="form-label fw-semibold">
          Nhóm hàng
        </label>
        <ComboBox
          id="product-group"
          disabled={!value.industry}
          options={[
            {
              value: "",
              label: value.industry
                ? "-- Chọn --"
                : "-- Chọn ngành hàng trước --",
            },
            ...toOptions(groups),
          ]}
          value={value.group}
          onChange={(e) =>
            onChange({ ...value, group: e.target.value, kind: "" })
          }
        />
      </div>

      <div className="col-md-4">
        <label htmlFor="product-kind" className="form-label fw-semibold">
          Loại hàng
        </label>
        <ComboBox
          id="product-kind"
          disabled={!value.group}
          options={[
            {
              value: "",
              label: value.group ? "-- Chọn --" : "-- Chọn nhóm hàng trước --",
            },
            ...toOptions(kinds),
          ]}
          value={value.kind}
          onChange={(e) => onChange({ ...value, kind: e.target.value })}
        />
      </div>
    </>
  );
}
