import {gql} from "@apollo/client";


export const GET_USER = gql`
    query GetUser(
        $userId: Int!
    ) {
        getUser(userId: $userId) {
            createdAt,
            email
            profile {
                lastName
                firstName
                createdAt
                id
                avatars {
                    url
                    height
                    width
                }
            }
        }
    }
`