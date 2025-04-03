import React, { ChangeEvent, useState } from "react"

import { PaymentsListTable } from "@/features/payments-list/ui/PaymentsListTable"
import { useTranslation } from "@/shared/hooks/useTranslation"
import { Input } from "@/shared/ui/Input/Input"
import { useGetPaymentsQuery } from "@/queries/paymentsList/paymentsListgenerated"
import Pagination from "@/shared/ui/pagination/Pagination"
import { usePaginationParams } from "@/shared/hooks/usePaginationParams"

export const PaymentsList = () => {
  const [searchInput, setSearchInput] = useState("")
  const { t } = useTranslation()

  const { sortHandler, sortDirection, paginationParams } = usePaginationParams()

  const { data: payments } = useGetPaymentsQuery({
    variables: {
      pageNumber: paginationParams.pageNumber,
      pageSize: paginationParams.pageSize,
      searchTerm: searchInput,
      sortBy: sortDirection.key,
      sortDirection: sortDirection.direction,
    },
  })

  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="flex flex-col gap-8 pb-[40px]">
      <div className="px-4 flex gap-40">
        <Input
          type="search"
          placeholder={t.sidebar.search}
          fullWidth
          value={searchInput}
          onChange={e => onSearchTermChange(e)}
        />
      </div>
      <PaymentsListTable
        sortDirection={sortDirection}
        sortHandler={sortHandler}
        payments={payments?.getPayments.items!}
      />

      <Pagination
        currentPage={payments?.getPayments.page || 1}
        pageSize={payments?.getPayments.pageSize || 10}
        siblingCount={1}
        totalCount={payments?.getPayments.pagesCount || 0}
      />
    </div>
  )
}
