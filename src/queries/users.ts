import {gql} from "@apollo/client";

export const GET_PROFILE_INFO = gql`
    query getProfileInfo($userID: Int! = 10) {
        getUser(userId: $userID) {
            id
            userName
            email
        }
    }
`