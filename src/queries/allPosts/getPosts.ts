import { gql } from "@apollo/client"

export const GET_POSTS = gql`
  query getPosts(
    $endCursorPostId: Int
    $pageSize: Int
    $sortBy: String
    $searchTerm: String
    $sortDirection: SortDirection
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      pageSize: $pageSize
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pageSize
      pagesCount
      totalCount
      items {
        id
        createdAt
        description
        ownerId
        updatedAt
        userBan {
          createdAt
          reason
        }
        postOwner {
          id
          avatars {
            fileSize
            height
            url
            width
          }
          firstName
          lastName
          userName
        }
        images {
          url
          width
          height
          fileSize
          id
          createdAt
        }
      }
    }
  }
`
