import React from "react"

import {PaymentsListTableHeaderOptions} from "@/features/payments-list/CONSTs"
import {Table} from "@/shared/ui/Table/TableRoot"
import {SortDirection, SubscriptionPaymentsModel} from "@/types"
import {formatDate} from "@/shared/utils/formatDate"
import {Filter} from "@/shared/icons/filter";

interface Props {
    sortHandler: (e: { direction: "asc" | "desc"; key: string }) => void
    sortDirection: { direction: SortDirection; key: string }
    payments: SubscriptionPaymentsModel[]
}

export const PaymentsListTable = ({
                                      sortDirection,
                                      sortHandler,
                                      payments
                                  }: Props) => {

    return (
        <div className="w-full">
            <Table.TableRoot>
                <Filter/>
                <Table.TableHeader
                    columns={PaymentsListTableHeaderOptions}
                    onSort={e => sortHandler(e!)}
                    sort={sortDirection}
                />
                <Table.TableBody>
                    {payments?.map((payment, index) => (
                        <Table.TableRow key={index}>

                            <Table.TableCell>
                                <div className="flex items-center">
                                    {payment.avatars && payment.avatars.length > 0 && payment.avatars[0].url ? (
                                        <img
                                            src={payment.avatars[0].url}
                                            alt={"Avatar"}
                                            className="w-[36px] h-[36px] rounded-full mr-2"
                                        />
                                    ) : (
                                        <div
                                            className="w-[36px] h-[36px] bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                            <span className="text-gray-400 text-xs ms-2">No Img</span>
                                        </div>
                                    )}
                                    <span>{payment.userName}</span>
                                </div>
                            </Table.TableCell>

                            <Table.TableCell>
                                {new Date(payment.createdAt).toLocaleDateString('ru-RU').replace(/\//g, '.')}
                            </Table.TableCell>

                            <Table.TableCell>{`${payment.amount} $`}</Table.TableCell>
                            <Table.TableCell>{(() => {
                                switch (payment.amount) {
                                    case 1:
                                        return "7 day";
                                    case 10:
                                        return "30 days";
                                    case 50:
                                        return "120 days";
                                    case 100:
                                        return "365 days";
                                    default:
                                        return "Неизвестный платеж";
                                }
                            })()
                            }</Table.TableCell>
                            <Table.TableCell>{payment.paymentMethod}</Table.TableCell>
                        </Table.TableRow>
                    ))}
                </Table.TableBody>
            </Table.TableRoot>
        </div>
    )
}

