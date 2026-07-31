import type { Combo } from "../types/combo";

/** Dữ liệu mẫu — thay bằng service fetch khi có API. variantId trỏ vào products.ts */
export const combos: Combo[] = [
  {
    id: "CB-001",
    name: "Combo đồng phục bếp",
    description: "Áo bếp Pizza size M kèm áo đầu bếp size M",
    items: [
      { variantId: "P001-3", quantity: 1 },
      { variantId: "P002-1", quantity: 1 },
    ],
    price: 490_000,
    status: "selling",
  },
  {
    id: "CB-002",
    name: "Combo phục vụ 3 người",
    description: "Ba áo phục vụ đủ size M, L, XL",
    items: [
      { variantId: "P003-1", quantity: 1 },
      { variantId: "P003-2", quantity: 1 },
      { variantId: "P003-3", quantity: 1 },
    ],
    price: 495_000,
    status: "selling",
  },
  {
    id: "CB-003",
    name: "Combo bao bì pizza",
    description: "Vỏ hộp pizza hai cỡ kèm túi nilon",
    items: [
      { variantId: "P004-1", quantity: 10 },
      { variantId: "P004-2", quantity: 10 },
      { variantId: "P006-1", quantity: 20 },
    ],
    price: 150_000,
    status: "selling",
  },
  {
    id: "CB-004",
    name: "Combo cốc trà sữa",
    description: "Cốc 500ml và 700ml cho quầy pha chế",
    items: [
      { variantId: "P005-1", quantity: 50 },
      { variantId: "P005-2", quantity: 50 },
    ],
    price: 250_000,
    status: "selling",
  },
  {
    id: "CB-005",
    name: "Combo đồ uống sáng",
    description: "Cà phê sữa đá size M kèm trà đào cam sả size M",
    items: [
      { variantId: "P007-1", quantity: 1 },
      { variantId: "P008-1", quantity: 1 },
    ],
    price: 62_000,
    status: "selling",
  },
  {
    id: "CB-006",
    name: "Combo trà đào size lớn",
    description: "Hai ly trà đào cam sả size L",
    items: [{ variantId: "P008-2", quantity: 2 }],
    price: 85_000,
    status: "stopped",
  },
];
