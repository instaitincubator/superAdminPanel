import { ChangeEvent, useEffect, useState } from "react"

import { defaultPaginationParams } from "@/features/users-list/CONSTs"
import { useTranslation } from "@/shared/hooks/useTranslation"
import { Option } from "@/shared/ui/Select/types"
import { SortDirection, UserBlockStatus } from "@/types"

export const useUsersPagination = () => {
  const { t } = useTranslation()

  const [paginationParams, setPaginationParams] = useState(
    defaultPaginationParams
  )
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setPaginationParams(prevState => ({
        ...prevState,
        searchTerm: searchInput,
      }))
    }, 500)

    return () => clearTimeout(handler)
  }, [searchInput])

  const sortHandler = (e: { direction: "asc" | "desc"; key: string }) => {
    setPaginationParams({
      ...paginationParams,
      sortBy: e.key,
      sortDirection:
        e.direction === "asc" ? SortDirection.Asc : SortDirection.Desc,
    })
  }
  const sortDirection = {
    direction: paginationParams.sortDirection,
    key: paginationParams.sortBy,
  }

  const onByBanFilterChange = (e: Option) => {
    setPaginationParams({
      ...paginationParams,
      statusFilter: e.value as UserBlockStatus,
    })
  }

  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
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
    sortHandler,
    sortDirection,
    onSearchTermChange,
    filterByBanOptions,
    onByBanFilterChange,
    setPaginationParams,
    paginationParams,
    byBanSelectValue,
  }
}
