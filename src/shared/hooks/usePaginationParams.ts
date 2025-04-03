import { useEffect, useState } from "react"

import { defaultPaginationParams } from "@/features/users-list/CONSTs"
import { SortDirection, UserBlockStatus } from "@/types"
import { useRouter } from "next/router"

export const usePaginationParams = () => {
  const router = useRouter()

  const [paginationParams, setPaginationParams] = useState(
    defaultPaginationParams
  )

  useEffect(() => {
    setPaginationParams({
      ...paginationParams,
      sortBy: router.query.sortBy ? (router.query.sortBy as string) : "",
      sortDirection: router.query.sortDirection
        ? (router.query.sortDirection as SortDirection)
        : SortDirection.Asc,
      searchTerm: router.query.searchTerm
        ? (router.query.searchTerm as string)
        : "",
      statusFilter: router.query.statusFilter
        ? (router.query.statusFilter as UserBlockStatus)
        : UserBlockStatus.All,
      pageSize: router.query.pageSize ? Number(router.query.pageSize) : 8,
      pageNumber: router.query.pageNumber ? Number(router.query.pageNumber) : 1,
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

  return {
    sortHandler,
    sortDirection,
    setPaginationParams,
    paginationParams,
  }
}
