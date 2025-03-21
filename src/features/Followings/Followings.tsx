import React from 'react';
import {useRouter} from "next/router";
import {usePaginationParams} from "@/shared/hooks/usePaginationParams";
import {useTranslation} from "@/shared/hooks/useTranslation";
import {Table} from "@/shared/ui/Table/TableRoot";
import {tableHeaderOptionsByFollow} from "@/features/users-list/CONSTs";
import Pagination from "@/shared/ui/pagination/Pagination";
import {useGetUserFollowingsQuery} from "@/queries/userFollowings/userFollowingsgenerated";
import {UserCell} from "@/features/Followers/UserCell";

export const Followings = () => {
    const router = useRouter()
    const {paginationParams, sortHandler, sortDirection } = usePaginationParams()
    const {sortBy, pageSize, pageNumber} = paginationParams
    const userId = Number(router.query.id)
    const {locale} = useTranslation()

    const {data} = useGetUserFollowingsQuery({variables: { userId, sortBy, pageNumber, pageSize}})


    return (
        <div className="flex flex-col gap-8 pb-[40px]">
            <div className="w-full mt-4">
                <Table.TableRoot>
                    <Table.TableHeader
                        columns={tableHeaderOptionsByFollow}
                        onSort={e => sortHandler(e!)}
                        sort={sortDirection}
                    />
                    <Table.TableBody>
                        {data?.getFollowing.items?.map((item, index) => {

                            return (

                                <Table.TableRow key={index}>
                                    <Table.TableCell>
                                        {item.userId}
                                    </Table.TableCell>
                                    <Table.TableCell className="w-full">
                                        {item.userName}
                                    </Table.TableCell>
                                    <UserCell userId={item.userId}/>
                                    <Table.TableCell className="w-full">
                                        {new Date(item.createdAt).toLocaleDateString(locale, {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </Table.TableCell>
                                </Table.TableRow>
                            )
                        })}
                    </Table.TableBody>
                </Table.TableRoot>
            </div>
            <Pagination
                currentPage={data?.getFollowing.page!}
                pageSize={data?.getFollowing.pageSize!}
                siblingCount={1}
                totalCount={data?.getFollowing.totalCount!}
                withReplace
            />
        </div>
    );
};
