import { useEffect, useState } from "react"

import { defaultPaginationParams } from "@/features/users-list/CONSTs"
import { useTranslation } from "@/shared/hooks/useTranslation"
import { Option } from "@/shared/ui/Select/types"
import { SortDirection, UserBlockStatus } from "@/types"
import { useRouter } from "next/router"

export const useUsersPaginationCopy = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [paginationParams, setPaginationParams] = useState(
    defaultPaginationParams
  )

  useEffect(() => {
    setPaginationParams({
      ...paginationParams,
      sortBy:
        router.query.sortBy ? router.query.sortBy as string : "",
      sortDirection:
        router.query.sortDirection
          ? (router.query.sortDirection as SortDirection)
          : SortDirection.Asc,
      searchTerm:
        router.query.searchTerm
          ? router.query.searchTerm as string
          : "",
      statusFilter:
        router.query.statusFilter
          ? (router.query.statusFilter as UserBlockStatus)
          : UserBlockStatus.All,
      pageSize:
        router.query.pageSize
          ? Number(router.query.pageSize)
          : 10,
      pageNumber:
        router.query.pageNumber
          ? Number(router.query.pageNumber)
          : 1,
    })
  }, [router])

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
    const oldQueries = {...router.query}
    if (e.value === UserBlockStatus.All) {
      delete oldQueries.statusFilter
    }
    const queries = e.value === UserBlockStatus.All ?
        {...oldQueries,
          pageNumber: 1}
        :
        {
          ...oldQueries,
          statusFilter: e.value as UserBlockStatus,
          pageNumber: 1
        }
    void router.push({
      pathname: router.pathname,
      query: queries,
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
    sortHandler,
    sortDirection,
    filterByBanOptions,
    onByBanFilterChange,
    setPaginationParams,
    paginationParams,
    byBanSelectValue,
  }
}
