import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserPaymentsQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetUserPaymentsQuery = { __typename?: 'Query', getPaymentsByUser: { __typename?: 'PaymentPaginationModel', pageSize: number, page: number, pagesCount: number, totalCount: number, items: Array<{ __typename?: 'SubscriptionByPaymentModel', id: string, businessAccountId: number, dateOfPayment?: any | null, endDate?: any | null, startDate?: any | null, status: Types.StatusSubscriptionType, paymentType?: Types.PaymentMethod | null, type: Types.SubscriptionType, price: number, payments: Array<{ __typename?: 'Payment', endDate?: any | null, id?: number | null, createdAt?: any | null, amount?: number | null, currency?: Types.CurrencyType | null, paymentMethod?: Types.PaymentMethod | null, type?: Types.SubscriptionType | null }> }> } };


export const GetUserPaymentsDocument = gql`
    query getUserPayments($userId: Int!, $pageSize: Int = 10, $pageNumber: Int = 1, $sortBy: String = "createdAt", $sortDirection: SortDirection = desc) {
  getPaymentsByUser(
    userId: $userId
    pageNumber: $pageNumber
    pageSize: $pageSize
    sortBy: $sortBy
    sortDirection: $sortDirection
  ) {
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
    `;

/**
 * __useGetUserPaymentsQuery__
 *
 * To run a query within a React component, call `useGetUserPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPaymentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetUserPaymentsQuery(baseOptions: Apollo.QueryHookOptions<GetUserPaymentsQuery, GetUserPaymentsQueryVariables> & ({ variables: GetUserPaymentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>(GetUserPaymentsDocument, options);
      }
export function useGetUserPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>(GetUserPaymentsDocument, options);
        }
export function useGetUserPaymentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>(GetUserPaymentsDocument, options);
        }
export type GetUserPaymentsQueryHookResult = ReturnType<typeof useGetUserPaymentsQuery>;
export type GetUserPaymentsLazyQueryHookResult = ReturnType<typeof useGetUserPaymentsLazyQuery>;
export type GetUserPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetUserPaymentsSuspenseQuery>;
export type GetUserPaymentsQueryResult = Apollo.QueryResult<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>;