import React from "react"

import { UsersListTable } from "@/features/users-list/ui/UsersListTable"
import { useGetUsersQuery } from "@/queries/allUsers/usersgenerated"
import { useTranslation } from "@/shared/hooks/useTranslation"
import Pagination from "@/shared/ui/pagination/Pagination"
import Select from "@/shared/ui/Select/Select"
import {useUsersPaginationCopy} from "@/features/users-list/hooks/useUsersPaginationCopy";
import SearchWithQueries from "@/shared/ui/SearchWithQueries/SearchWithQueries";

export const UsersList = () => {
  const { t } = useTranslation()
  const {
    sortHandler,
    sortDirection,
    onByBanFilterChange,
    paginationParams,
    byBanSelectValue,
    filterByBanOptions,
  } = useUsersPaginationCopy()

  const { data: users } = useGetUsersQuery({ variables: paginationParams })

  return (
    <div className="flex flex-col gap-8 pb-[40px]">
      <div className="px-4 pt-4 flex gap-40">
        <SearchWithQueries
          placeholder={t.sidebar.search}
        />
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
