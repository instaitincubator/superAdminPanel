import React from "react"

import {Table} from "@/shared/ui/Table/TableRoot"
import {SortDirection, SubscriptionPaymentsModel} from "@/types"
import {Filter} from "@/shared/icons/filter";
import Image from "next/image";
import {useTranslation} from "@/shared/hooks/useTranslation";

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

    const {t} = useTranslation()

    const translatedHeader = [
        {title: t.paymentsList.Username, key: 'UserName', sortable: true},
        {title: t.paymentsList.createdAt, key: 'createdAt', sortable: true},
        {title: t.paymentsList.amount, key: 'amount', sortable: true},
        {title: t.paymentsList.Subscription, key: 'Subscription', sortable: true},
        {title: t.paymentsList.paymentMethod, key: 'paymentMethod', sortable: true},
    ]

    return (
        <div className="w-full">
            <Table.TableRoot>
                <Filter/>
                <Table.TableHeader
                    columns={translatedHeader}
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
                                            className="mr-2">
                                            <Image
                                                src={"/avatar.png"}
                                                alt={`avatar`}
                                                width={36}
                                                height={36}
                                                className="rounded-full"
                                            />
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
                                        return `7 ${t.paymentsList.days}`
                                    case 10:
                                        return `30 ${t.paymentsList.days}`
                                    case 50:
                                        return `120 ${t.paymentsList.days}`
                                    case 100:
                                        return `365 ${t.paymentsList.days}`
                                    default:
                                        return `${t.paymentsList.unknownPayment}`
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

