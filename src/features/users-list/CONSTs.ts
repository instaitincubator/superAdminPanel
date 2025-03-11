import { SortDirection, UserBlockStatus } from "@/types"

export const tableHeaderOptions = [
  {
    key: "User ID",
    sortable: false,
    title: "User ID",
  },
  {
    key: "Username",
    sortable: true,
    title: "userName",
  },
  {
    key: "createdAt",
    sortable: true,
    title: "Date added",
  },
  {
    key: "",
    sortable: false,
    title: "",
  },
]

export const defaultPaginationParams = {
  pageNumber: 1,
  pageSize: 10,
  sortBy: "createdAt",
  sortDirection: SortDirection.Asc,
  statusFilter: UserBlockStatus.All,
  searchTerm: "",
}
