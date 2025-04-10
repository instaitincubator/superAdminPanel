import React from "react"

import { useTranslation } from "@/shared/hooks/useTranslation"
import { PaginationParams } from "@/shared/types/utilTypes"
import { DOTS, usePagination } from "@/shared/ui/pagination/usePagination"
import Select from "@/shared/ui/Select/Select"

import { ChevronLeftIcon, ChevronRightIcon } from "../../../../public"
import { useRouter } from "next/router"

const Pagination: React.FC<PaginationParams> = ({
  currentPage,
  pageSize,
  siblingCount,
  totalCount,
  withReplace,
  pageSizeExtension,
}) => {
  const onPageSizeChange = (value: number) => {
    const pushedRoute = {
      pathname: router.pathname,
      query: {
        ...router.query,
        pageSize: value,
      },
    }
    if (withReplace) {
      void router.replace(pushedRoute)
    } else {
      void router.push(pushedRoute)
    }
  }
  const paginationRange = usePagination({
    currentPage,
    onPageSizeChange,
    pageSize,
    siblingCount,
    totalCount,
  })

  const { t } = useTranslation()
  const router = useRouter()

  const lastPage =
    paginationRange && paginationRange.length > 0
      ? paginationRange[paginationRange.length - 1]
      : 0

  const rangePagination = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 },
    { label: pageSizeExtension?.label!, value: pageSizeExtension?.value! },
  ].sort((a, b) => +a.label - +b.label)
  const minItemsForPagination = 5

  if (!totalCount || totalCount <= 0) {
    return null
  }
  const handlePageSizeChange = (value: number) => {
    onPageSizeChange(value)
  }

  const onPageChange = (value: number) => {
    const pushedRoute = {
      pathname: router.pathname,
      query: {
        ...router.query,
        pageNumber: value,
      },
    }

    if (withReplace) {
      void router.replace(pushedRoute)
    } else {
      void router.push(pushedRoute)
    }
  }

  return (
    <div className="flex">
      <ul className="flex items-center gap-2 list-none">
        <li
          className={`flex justify-center items-center w-8 h-8 cursor-pointer ${
            currentPage === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => +currentPage > 1 && onPageChange(+currentPage - 1)}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </li>

        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                className="flex justify-center items-center w-6 h-6 text-gray-500 cursor-default"
                key={index}
              >
                {DOTS}
              </li>
            )
          }

          return (
            <li
              className={`flex justify-center items-center w-6 h-6 text-sm leading-6 rounded transition-colors duration-200 
                            ${
                              pageNumber === currentPage
                                ? "text-dark-900  bg-gray-100 w-[25px] h-[25px] text-regular-14"
                                : "text-light-100 hover:bg-none cursor-pointer"
                            }`}
              key={index}
              onClick={() => onPageChange(+pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}

        <li
          className={`flex justify-center items-center w-8 h-8 cursor-pointer ${
            currentPage === lastPage ? "opacity-50 pointer-events-none" : ""
          }}`}
          onClick={() =>
            currentPage < +lastPage && onPageChange(+currentPage + 1)
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </li>
      </ul>
      {totalCount && totalCount > minItemsForPagination && (
        <div className="flex flex-row items-center justify-center ml-2">
          <span className="mr-2">{t.common.pagination.show}</span>
          <Select
            className="text-cyan-50"
            onChange={option => handlePageSizeChange(+option.value)}
            options={rangePagination}
            value={{ label: pageSize, value: pageSize }}
          />
          <span className="ml-2">{t.common.pagination.onPage}</span>
        </div>
      )}
    </div>
  )
}

export default Pagination
