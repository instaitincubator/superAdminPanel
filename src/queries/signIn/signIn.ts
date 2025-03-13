import { gql } from "@apollo/client"

const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        loginAdmin(email: $email, password: $password) {
            logged
        }
    }
`
