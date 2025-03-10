import { gql } from "@apollo/client"

const REMOVE_USER = gql`
  mutation RemoveUser($userId: Int!) {
    removeUser(userId: $userId)
  }
`
