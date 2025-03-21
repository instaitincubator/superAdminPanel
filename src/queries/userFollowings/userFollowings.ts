import {gql} from "@apollo/client";


export const GET_USER_FOLLOWERS = gql`
    query GetUserFollowings(
        $userId: Int!
        $pageSize: Int = 10
        $pageNumber: Int = 1
        $sortBy: String = "createdAt"
        $sortDirection: SortDirection = desc


    ) {
        getFollowing(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy: $sortBy,sortDirection: $sortDirection) {
            pageSize
            page
            totalCount
            pagesCount
            items {
                userId
                userName
                createdAt
                id
            }
        }
    }
`