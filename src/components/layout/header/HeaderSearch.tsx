import Icon from "../../ui/Icon";
import Input from "../../ui/Input";
import { ICON_SIZE, SEARCH_PADDING_RIGHT } from "./constants";

/** Nhãn ⌘K chưa gắn phím tắt */
export default function HeaderSearch() {
  return (
    <div className="app-header-search w-100 d-none d-md-block">
      <Input
        leftIcon={<Icon name="search" size={ICON_SIZE.search} />}
        rightIcon={<kbd className="app-header-kbd">⌘K</kbd>}
        placeholder="Tìm kiếm nhanh..."
        aria-label="Tìm kiếm nhanh"
        style={{ paddingRight: SEARCH_PADDING_RIGHT }}
      />
    </div>
  );
}
