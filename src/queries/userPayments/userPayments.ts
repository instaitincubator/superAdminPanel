import {gql} from "@apollo/client";


export const GET_USER_PAYMENTS = gql`
    query getUserPayments(
    $userId: Int!
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    ) {
        getPaymentsByUser(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize,sortBy: $sortBy,sortDirection: $sortDirection ) {
            pageSize
            page
            pagesCount
            totalCount
            items {
                id
                businessAccountId
                dateOfPayment
                endDate
                startDate
                status
                paymentType
                type
                price
                payments {
                    endDate
                    id
                    createdAt
                    amount
                    currency
                    paymentMethod
                    type
                }
            }
        }
    }
`