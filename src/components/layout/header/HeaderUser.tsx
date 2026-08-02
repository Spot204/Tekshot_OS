import { Dropdown } from "react-bootstrap";
import Icon from "../../ui/Icon";
import type { CurrentUser } from "../../../types/user";
import { ICON_SIZE } from "./constants";

type HeaderUserProps = CurrentUser;

/** Menu tài khoản. Các mục chưa có handler — chưa có auth. */
export default function HeaderUser({ name, role, avatarUrl }: HeaderUserProps) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="button"
        type="button"
        aria-label={`Tài khoản ${name}`}
        className="app-header-user no-caret d-flex align-items-center"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="app-header-avatar" />
        ) : (
          <span className="app-header-avatar" aria-hidden="true">
            {name.trim().charAt(0).toUpperCase()}
          </span>
        )}

        <span className="d-none d-md-flex flex-column text-start lh-sm">
          <span className="fw-semibold text-body-emphasis">{name}</span>
          <span className="app-header-role">{role}</span>
        </span>

        <Icon
          name="chevron-down"
          size={ICON_SIZE.caret}
          className="app-header-caret"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-sm border-0 mt-2">
        <Dropdown.Item as="button" type="button">
          <Icon name="person" size={ICON_SIZE.caret} className="me-2" />
          Thông tin cá nhân
        </Dropdown.Item>

        <Dropdown.Item as="button" type="button">
          <Icon name="key" size={ICON_SIZE.caret} className="me-2" />
          Đổi mật khẩu
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item as="button" type="button" className="text-danger">
          <Icon
            name="box-arrow-right"
            size={ICON_SIZE.caret}
            className="me-2"
          />
          Đăng xuất
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
