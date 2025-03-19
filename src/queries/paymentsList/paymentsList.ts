import { gql } from "@apollo/client"

const PAYMENTS_LIST = gql`
    query getPayments (
        $pageNumber: Int
        $pageSize: Int
        $searchTerm: String
        $sortBy: String
        $sortDirection: SortDirection
    ){
        getPayments(
            pageNumber: $pageNumber
            pageSize: $pageSize
            searchTerm: $searchTerm
            sortBy: $sortBy
            sortDirection: $sortDirection
        ){
            items {
                amount
                avatars{
                    fileSize
                    height
                    url
                    width
                }
                createdAt
                currency
                endDate
                id
                paymentMethod
                type
                userId
                userName
            }
            page
            pageSize
            pagesCount
            totalCount
        }
    }
`
