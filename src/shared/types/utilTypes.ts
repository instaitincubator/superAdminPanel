export type PaginationParams = {
  currentPage: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (value: number) => void
  pageSize: number
  siblingCount: number
  totalCount: number | undefined
}
