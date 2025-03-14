import { useEffect, useState } from "react"

import { defaultPaginationParams } from "@/features/users-list/CONSTs"
import { useTranslation } from "@/shared/hooks/useTranslation"
import { Option } from "@/shared/ui/Select/types"
import { SortDirection, UserBlockStatus } from "@/types"
import { useRouter } from "next/router"

export const useUsersPagination = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [paginationParams, setPaginationParams] = useState(
    defaultPaginationParams
  )

  useEffect(() => {
    setPaginationParams({
      ...paginationParams,
      sortBy:
        typeof router.query.sortBy === "string" ? router.query.sortBy : "",
      sortDirection:
        typeof router.query.sortDirection === "string"
          ? (router.query.sortDirection as SortDirection)
          : SortDirection.Asc,
      searchTerm:
        typeof router.query.searchTerm === "string"
          ? router.query.searchTerm
          : "",
      statusFilter:
        typeof router.query.statusFilter === "string"
          ? (router.query.statusFilter as UserBlockStatus)
          : UserBlockStatus.All,
      pageSize:
        typeof router.query.pageSize === "string"
          ? Number(router.query.pageSize)
          : 10,
      pageNumber:
        typeof router.query.pageNumber === "string"
          ? Number(router.query.pageNumber)
          : 1,
    })
  }, [router])

  const [searchInput, setSearchInput] = useState("")
  useEffect(() => {
    const handler = setTimeout(() => {
      void router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          searchTerm: searchInput,
        },
      })
    }, 500)

    return () => clearTimeout(handler)
  }, [searchInput])

  const sortHandler = (e: { direction: "asc" | "desc"; key: string }) => {
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sortBy: e.key,
        sortDirection: e.direction,
      },
    })
  }

  const sortDirection = {
    direction: paginationParams.sortDirection,
    key: paginationParams.sortBy,
  }

  const onByBanFilterChange = (e: Option) => {
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        statusFilter: e.value as UserBlockStatus,
      },
    })
  }
  const onPageChange = (value: number) => {
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        pageNumber: value,
      },
    })
  }
  const onPageSizeChange = (value: number) => {
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        pageSize: value,
      },
    })
  }
  const filterByBanOptions = [
    { label: t.admin.userList.banValue.notSelected, value: "ALL" },
    { label: t.admin.userList.banValue.blocked, value: "BLOCKED" },
    { label: t.admin.userList.banValue.notBlocked, value: "UNBLOCKED" },
  ]

  const byBanSelectValue =
    filterByBanOptions.find(
      option => option.value === paginationParams.statusFilter
    ) || filterByBanOptions[0]

  return {
    searchInput,
    onPageChange,
    onPageSizeChange,
    sortHandler,
    sortDirection,
    setSearchInput,
    filterByBanOptions,
    onByBanFilterChange,
    setPaginationParams,
    paginationParams,
    byBanSelectValue,
  }
}
