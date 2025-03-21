import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserFollowersQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetUserFollowersQuery = { __typename?: 'Query', getFollowers: { __typename?: 'FollowPaginationModel', pageSize: number, page: number, totalCount: number, pagesCount: number, items: Array<{ __typename?: 'Follow', userId: number, userName?: string | null, createdAt: any, id: number }> } };


export const GetUserFollowersDocument = gql`
    query GetUserFollowers($userId: Int!, $pageSize: Int = 10, $pageNumber: Int = 1, $sortBy: String = "createdAt", $sortDirection: SortDirection = desc) {
  getFollowers(
    userId: $userId
    pageSize: $pageSize
    pageNumber: $pageNumber
    sortBy: $sortBy
    sortDirection: $sortDirection
  ) {
    pageSize
    page
    totalCount
    pagesCount
    items {
      userId
      userName
      createdAt
      id
    }
  }
}
    `;

/**
 * __useGetUserFollowersQuery__
 *
 * To run a query within a React component, call `useGetUserFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFollowersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetUserFollowersQuery(baseOptions: Apollo.QueryHookOptions<GetUserFollowersQuery, GetUserFollowersQueryVariables> & ({ variables: GetUserFollowersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFollowersQuery, GetUserFollowersQueryVariables>(GetUserFollowersDocument, options);
      }
export function useGetUserFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFollowersQuery, GetUserFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFollowersQuery, GetUserFollowersQueryVariables>(GetUserFollowersDocument, options);
        }
export function useGetUserFollowersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserFollowersQuery, GetUserFollowersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFollowersQuery, GetUserFollowersQueryVariables>(GetUserFollowersDocument, options);
        }
export type GetUserFollowersQueryHookResult = ReturnType<typeof useGetUserFollowersQuery>;
export type GetUserFollowersLazyQueryHookResult = ReturnType<typeof useGetUserFollowersLazyQuery>;
export type GetUserFollowersSuspenseQueryHookResult = ReturnType<typeof useGetUserFollowersSuspenseQuery>;
export type GetUserFollowersQueryResult = Apollo.QueryResult<GetUserFollowersQuery, GetUserFollowersQueryVariables>;