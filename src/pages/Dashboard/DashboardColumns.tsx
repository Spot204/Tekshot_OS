import type { Column } from "../../components/ui/Table";
import type { PageMetric } from "../../types/dashboard";

export const dashboardColumns: Column<PageMetric>[] = [
  {
    id: "name",
    header: "Trang",
    accessor: "name",
    render: (row) => <span className="fw-medium ">{row.name}</span>,
  },
  {
    id: "views",
    header: "Lượt xem",
    accessor: "views",
    align: "end",
    render: (row) => row.views.toLocaleString(),
  },
  {
    id: "viewers",
    header: "Người xem",
    accessor: "viewers",
    align: "end",
    render: (row) => row.viewers.toLocaleString(),
  },
  {
    id: "visits",
    header: "Truy cập",
    accessor: "visits",
    align: "end",
    render: (row) => row.visits.toLocaleString(),
  },
  {
    id: "followers",
    header: "Theo dõi",
    accessor: "followers",
    align: "end",
    render: (row) => row.followers.toLocaleString(),
  },
];
