import React from 'react';
import {usePaginationParams} from "@/shared/hooks/usePaginationParams";
import { useGetUserPaymentsQuery} from "@/queries/userPayments/userPaymentsgenerated";
import {useRouter} from "next/router";
import Pagination from "@/shared/ui/pagination/Pagination";
import {Table} from "@/shared/ui/Table/TableRoot";
import {subscriptionTypes, tableHeaderOptionsByPayments} from "@/features/users-list/CONSTs";
import {useTranslation} from "@/shared/hooks/useTranslation";

export const UserPayments = () => {
    const router = useRouter()
    const {paginationParams, sortHandler, sortDirection } = usePaginationParams()
    const {sortBy, pageSize, pageNumber} = paginationParams
    const userId = Number(router.query.id)
    const {locale} = useTranslation()

    const {data} = useGetUserPaymentsQuery({variables: { userId, sortBy, pageNumber, pageSize}})

    return (
        <div className="flex flex-col gap-8 pb-[40px]">
            <div className="w-full mt-4">
                <Table.TableRoot>
                    <Table.TableHeader
                        columns={tableHeaderOptionsByPayments}
                        onSort={e => sortHandler(e!)}
                        sort={sortDirection}
                    />
                    <Table.TableBody>
                        {data?.getPaymentsByUser.items?.map((pay, index) => (
                            <Table.TableRow key={index}>
                                <Table.TableCell>
                                    {new Date(pay.dateOfPayment).toLocaleDateString(locale, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </Table.TableCell>
                                <Table.TableCell>
                                    {new Date(pay.endDate).toLocaleDateString(locale, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </Table.TableCell>
                                <Table.TableCell className="w-full">
                                    ${pay.price}
                                </Table.TableCell>
                                <Table.TableCell className="w-full">
                                    {subscriptionTypes[pay.type]}
                                </Table.TableCell>
                                <Table.TableCell className="w-full">
                                    {`${pay.paymentType?.slice(0, 1)}${pay.paymentType?.slice(1).toLowerCase()}`}
                                </Table.TableCell>
                            </Table.TableRow>
                        ))}
                    </Table.TableBody>
                </Table.TableRoot>
            </div>
            <Pagination
                currentPage={data?.getPaymentsByUser.page!}
                pageSize={data?.getPaymentsByUser.pageSize!}
                siblingCount={1}
                totalCount={data?.getPaymentsByUser.totalCount!}
                withReplace
            />
        </div>
    );
};
