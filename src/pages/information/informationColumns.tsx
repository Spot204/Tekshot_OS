import type { Column } from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import type { StoreTable } from "./information";

export const informationColumns: Column<StoreTable>[] = [
  {
    id: "tableNo",
    header: "Số bàn",
    accessor: "tableNo",
    width: "120px",
  },
  {
    id: "area",
    header: "Khu vực",
    accessor: "area",
  },
  {
    id: "status",
    header: "Trạng thái",
    render: (row) => (
      <Badge variant={row.status === "active" ? "success" : "danger"} size="sm">
        {row.status === "active" ? "Đang sử dụng" : "Không sử dụng"}
      </Badge>
    ),
  },
];
