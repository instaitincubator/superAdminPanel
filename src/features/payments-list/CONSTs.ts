import { SortDirection, UserBlockStatus } from "@/types"

export const PaymentsListTableHeaderOptions = [
    {
        key: "Username",
        sortable: true,
        title: "Username",
    },
    {
        key: "createdAt",
        sortable: true,
        title: "Date added",
    },
    {
        key: "amount",
        sortable: true,
        title: "Amount, $",
    },
    {
        key: "Subscription",
        sortable: true,
        title: "Subscription",
    },
    {
        key: "paymentMethod",
        sortable: true,
        title: "Payment Method",
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
