import {gql} from "@apollo/client";


export const GET_USER_PHOTOS = gql`
    query GetUserPhotos(
        $userId: Int!
        $endCursorId: Int
    ) {
        getPostsByUser(endCursorId: $endCursorId, userId: $userId) {
            __typename
            pagesCount
            pageSize
            totalCount
            items {
                id
                createdAt
                width
                height
                url
                fileSize
                __typename
            }
        }
    }
`