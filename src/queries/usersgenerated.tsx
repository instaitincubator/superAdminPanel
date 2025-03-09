import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../types';

const defaultOptions = {} as const;

export type GetUsersQueryVariables = Types.Exact<{
    pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
    pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
    sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
    searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
    sortDirection?: Types.InputMaybe<Types.SortDirecton>;
    statusFilter?: Types.InputMaybe<Types.UserBlockStatus>;
}>;


export type GetUsersQuery = {
    __typename?: 'Query',
    getUsers: {
        __typename?: 'UsersPaginationModel',
        pagination: {
            __typename?: 'PaginationModel',
            page: number,
            pageSize: number,
            pagesCount: number,
            totalCount: number
        },
        users: Array<{
            __typename?: 'User',
            id: number,
            userName: string,
            email: string,
            createdAt: any,
            userBan?: { __typename?: 'UserBan', createdAt: any, reason: string } | null
        }>
    }
};


export const GetUsersDocument = gql`
    query GetUsers($pageNumber: Int, $pageSize: Int, $sortBy: String, $searchTerm: String, $sortDirection: SortDirection, $statusFilter: UserBlockStatus) {
        getUsers(
            pageNumber: $pageNumber
            pageSize: $pageSize
            sortBy: $sortBy
            sortDirection: $sortDirection
            searchTerm: $searchTerm
            statusFilter: $statusFilter
        ) {
            pagination {
                page
                pageSize
                pagesCount
                totalCount
            }
            users {
                id
                userName
                email
                createdAt
                userBan {
                    createdAt
                    reason
                }
            }
        }
    }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      pageNumber: // value for 'pageNumber'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      searchTerm: // value for 'searchTerm'
 *      sortDirection: // value for 'sortDirection'
 *      statusFilter: // value for 'statusFilter'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}

    return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}

export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}

    return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}

export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}

    return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}

export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;