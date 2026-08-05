export interface StoreTable {
  id: string;
  tableNo: string;
  area: string;
  status: "active" | "inactive";
}

export interface OpeningHour {
  day: string;
  timeRange: string;
}

export interface StoreInfo {
  name: string;
  code: string;
  category: string;
  phone: string;
  vat: string;
  warehouse: string;
  autoPrint: string;
}

export interface ProvinceOption {
  value: string;
  label: string;
}

export const storeInfo: StoreInfo = {
  name: "Tekshot",
  code: "wdrf",
  category: "Thực phẩm",
  phone: "0393265959",
  vat: "10%",
  warehouse: "Sử dụng",
  autoPrint: "Tắt",
};

export const openingHours: OpeningHour[] = [
  { day: "Thứ hai", timeRange: "09:00 - 22:00" },
  { day: "Thứ ba", timeRange: "09:00 - 22:00" },
  { day: "Thứ tư", timeRange: "09:00 - 22:00" },
  { day: "Thứ năm", timeRange: "09:00 - 22:00" },
  { day: "Thứ sáu", timeRange: "09:00 - 22:00" },
  { day: "Thứ bảy", timeRange: "09:00 - 22:00" },
  { day: "Chủ nhật", timeRange: "09:00 - 22:00" },
];

export const storeTables: StoreTable[] = [
  { id: "1", tableNo: "01", area: "Tầng 1", status: "active" },
  { id: "2", tableNo: "02", area: "Tầng 1", status: "active" },
  { id: "3", tableNo: "03", area: "Tầng 2", status: "active" },
  { id: "4", tableNo: "04", area: "Tầng 2", status: "inactive" },
  { id: "5", tableNo: "05", area: "Tầng 3", status: "active" },
];

export const provinces: ProvinceOption[] = [
  { value: "ha-noi", label: "Hà Nội" },
  { value: "ho-chi-minh", label: "TP. Hồ Chí Minh" },
  { value: "hai-phong", label: "Hải Phòng" },
  { value: "hue", label: "Huế" },
  { value: "da-nang", label: "Đà Nẵng" },
  { value: "can-tho", label: "Cần Thơ" },
  { value: "an-giang", label: "An Giang" },
  { value: "bac-ninh", label: "Bắc Ninh" },
  { value: "ca-mau", label: "Cà Mau" },
  { value: "cao-bang", label: "Cao Bằng" },
  { value: "dak-lak", label: "Đắk Lắk" },
  { value: "dien-bien", label: "Điện Biên" },
  { value: "dong-nai", label: "Đồng Nai" },
  { value: "dong-thap", label: "Đồng Tháp" },
  { value: "gia-lai", label: "Gia Lai" },
  { value: "ha-tinh", label: "Hà Tĩnh" },
  { value: "hung-yen", label: "Hưng Yên" },
  { value: "khanh-hoa", label: "Khánh Hòa" },
  { value: "lai-chau", label: "Lai Châu" },
  { value: "lam-dong", label: "Lâm Đồng" },
  { value: "lang-son", label: "Lạng Sơn" },
  { value: "lao-cai", label: "Lào Cai" },
  { value: "nghe-an", label: "Nghệ An" },
  { value: "ninh-binh", label: "Ninh Bình" },
  { value: "phu-tho", label: "Phú Thọ" },
  { value: "quang-ngai", label: "Quảng Ngãi" },
  { value: "quang-ninh", label: "Quảng Ninh" },
  { value: "quang-tri", label: "Quảng Trị" },
  { value: "son-la", label: "Sơn La" },
  { value: "tay-ninh", label: "Tây Ninh" },
  { value: "thai-nguyen", label: "Thái Nguyên" },
  { value: "thanh-hoa", label: "Thanh Hóa" },
  { value: "tuyen-quang", label: "Tuyên Quang" },
  { value: "vinh-long", label: "Vĩnh Long" },
];
