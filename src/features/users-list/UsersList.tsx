import React from 'react';

import {useUsersPagination} from "@/features/users-list/hooks/useUsersPagination";
import {UsersListTable} from "@/features/users-list/ui/UsersListTable";
import {useGetUsersQuery} from "@/queries/usersgenerated";
import {Input} from "@/shared/ui/Input/Input";
import Pagination from "@/shared/ui/pagination/Pagination";
import Select from "@/shared/ui/Select/Select";

export const UsersList = () => {

    const {
        byBanSelectValue,
        searchInput,
        sortHandler,
        sortDirection,
        onSearchTermChange,
        filterByBanOptions,
        onByBanFilterChange,
        setPaginationParams,
        paginationParams
    } = useUsersPagination()

    const {data: users} = useGetUsersQuery({variables: paginationParams})

    return (
        <div className="flex flex-col gap-8 pb-[40px]">
            <div className='px-4 pt-4 flex gap-40'>
                <Input type='search' placeholder='search' fullWidth
                       value={searchInput}
                       onChange={e => onSearchTermChange(e)}/>
                <Select options={filterByBanOptions} onChange={e => onByBanFilterChange(e)}
                        value={byBanSelectValue}
                        className='w-60'/>
            </div>
            <UsersListTable sortDirection={sortDirection} sortHandler={sortHandler} users={users?.getUsers.users!}/>
            <Pagination
                currentPage={users?.getUsers.pagination.page!}
                onPageChange={(value: number) =>
                    setPaginationParams({...paginationParams, pageNumber: value})
                }
                onPageSizeChange={(value: number) =>
                    setPaginationParams({...paginationParams, pageSize: value})
                }
                pageSize={users?.getUsers.pagination.pageSize!}
                siblingCount={1}
                totalCount={users?.getUsers.pagination.totalCount!}
            />
        </div>
    );
};