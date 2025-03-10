import { gql } from "@apollo/client"

export const BAN_USER = gql`
  mutation BanUser($userId: Int!, $banReason: String!) {
    banUser(userId: $userId, banReason: $banReason)
  }
`
