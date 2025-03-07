import {gql} from "@apollo/client";

export const GET_PROFILE_INFO = gql`
    query getProfileInfo($userID: Int! = 10) {
        getUser(userId: $userID) {
            id
            userName
            email
            createdAt
            profile {
                id
                userName
                firstName
                lastName
                city
                dateOfBirth
                aboutMe
                createdAt
                avatars {
                    url
                    width
                    height
                    fileSize
                }
            }
            userBan {
                reason
                createdAt
                __typename
            }
        }
    }
`