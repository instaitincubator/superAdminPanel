import {SortDirection, UserBlockStatus} from "@/types";

export const filterByBanOptions = [
    {label: "Not selected", value: "ALL"},
    {label: "Blocked", value: "BLOCKED"},
    {label: "Not Blocked", value: "UNBLOCKED"},
]

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
        key: "Profile link",
        sortable: false,
        title: "Profile link",
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
    searchTerm: '',
}