import React from "react"

import { UsersListTable } from "@/features/users-list/ui/UsersListTable"
import { useGetUsersQuery } from "@/queries/allUsers/usersgenerated"
import { useTranslation } from "@/shared/hooks/useTranslation"
import Pagination from "@/shared/ui/pagination/Pagination"
import Select from "@/shared/ui/Select/Select"
import { usePaginationParams } from "@/shared/hooks/usePaginationParams"
import SearchWithQueries from "@/shared/ui/SearchWithQueries/SearchWithQueries"
import { Option } from "@/shared/ui/Select/types"
import { UserBlockStatus } from "@/types"
import { useRouter } from "next/router"

export const UsersList = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { sortHandler, sortDirection, paginationParams } = usePaginationParams()

  const onByBanFilterChange = (e: Option) => {
    const oldQueries = { ...router.query }
    if (e.value === UserBlockStatus.All) {
      delete oldQueries.statusFilter
    }
    const queries =
      e.value === UserBlockStatus.All
        ? { ...oldQueries, pageNumber: 1 }
        : {
            ...oldQueries,
            statusFilter: e.value as UserBlockStatus,
            pageNumber: 1,
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

  const { data: users } = useGetUsersQuery({ variables: paginationParams })

  return (
    <div className="flex flex-col gap-8 pb-[40px]">
      <div className="px-4 pt-4 flex gap-40">
        <SearchWithQueries placeholder={t.sidebar.search} />
        <Select
          options={filterByBanOptions}
          onChange={e => onByBanFilterChange(e)}
          value={byBanSelectValue}
          className="w-60"
        />
      </div>
      <UsersListTable
        sortDirection={sortDirection}
        sortHandler={sortHandler}
        users={users?.getUsers.users!}
      />
      <Pagination
        currentPage={users?.getUsers.pagination.page!}
        pageSize={users?.getUsers.pagination.pageSize!}
        siblingCount={1}
        totalCount={users?.getUsers.pagination.totalCount!}
      />
    </div>
  )
}
