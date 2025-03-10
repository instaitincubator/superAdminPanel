import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query GetUsers(
    $pageNumber: Int
    $pageSize: Int
    $sortBy: String
    $searchTerm: String
    $sortDirection: SortDirection
    $statusFilter: UserBlockStatus
  ) {
    getUsers(
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
      statusFilter: $statusFilter
    ) {
      pagination {
        page
        pageSize
        pagesCount
        totalCount
      }
      users {
        id
        userName
        email
        createdAt
        userBan {
          createdAt
          reason
        }
      }
    }
  }
`
