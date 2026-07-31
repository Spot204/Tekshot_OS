import { getPasswordStrength } from "../../utils/password";

const SEGMENTS = 4;

/** Thanh 4 vạch dưới ô mật khẩu */
export default function PasswordStrength({ value }: { value: string }) {
  const { score, label, color } = getPasswordStrength(value);

  return (
    <div className="mt-2">
      <div className="d-flex justify-content-between small mb-1">
        <span className="text-secondary">Độ mạnh mật khẩu</span>
        {value && <span style={{ color }}>{label}</span>}
      </div>

      <div className="d-flex gap-1">
        {Array.from({ length: SEGMENTS }, (_, index) => (
          <span
            key={index}
            className="password-segment"
            style={{ backgroundColor: index < score ? color : undefined }}
          />
        ))}
      </div>
    </div>
  );
}
