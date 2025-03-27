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

export const tableHeaderOptionsByFollow = [
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
    key: "",
    sortable: false,
    title: "Profile link",
  },
  {
    key: "createdAt",
    sortable: false,
    title: "Subscription Date",
  },
]

export const tableHeaderOptionsByPayments = [
  {
    key: "dateOfPayment",
    sortable: true,
    title: "Date of Payment",
  },
  {
    key: "endDate",
    sortable: true,
    title: "End date of subscription",
  },
  {
    key: "amount",
    sortable: false,
    title: "Amount, $",
  },
  {
    key: "type",
    sortable: false,
    title: "Subscription Type",
  },
  {
    key: "paymentType",
    sortable: false,
    title: "Payment Type",
  },
]

export const subscriptionTypes = {
  'DAY' : '1 day',
  'WEEKLY' : '7 days',
  'MONTHLY' : '1 month'
}

export const defaultPaginationParams = {
  pageNumber: 1,
  pageSize: 10,
  sortBy: "createdAt",
  sortDirection: SortDirection.Asc,
  statusFilter: UserBlockStatus.All,
  searchTerm: "",
}
