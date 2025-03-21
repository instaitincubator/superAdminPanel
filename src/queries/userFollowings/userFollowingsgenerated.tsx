import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserFollowingsQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetUserFollowingsQuery = { __typename?: 'Query', getFollowing: { __typename?: 'FollowPaginationModel', pageSize: number, page: number, totalCount: number, pagesCount: number, items: Array<{ __typename?: 'Follow', userId: number, userName?: string | null, createdAt: any, id: number }> } };


export const GetUserFollowingsDocument = gql`
    query GetUserFollowings($userId: Int!, $pageSize: Int = 10, $pageNumber: Int = 1, $sortBy: String = "createdAt", $sortDirection: SortDirection = desc) {
  getFollowing(
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
 * __useGetUserFollowingsQuery__
 *
 * To run a query within a React component, call `useGetUserFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFollowingsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetUserFollowingsQuery(baseOptions: Apollo.QueryHookOptions<GetUserFollowingsQuery, GetUserFollowingsQueryVariables> & ({ variables: GetUserFollowingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFollowingsQuery, GetUserFollowingsQueryVariables>(GetUserFollowingsDocument, options);
      }
export function useGetUserFollowingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFollowingsQuery, GetUserFollowingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFollowingsQuery, GetUserFollowingsQueryVariables>(GetUserFollowingsDocument, options);
        }
export function useGetUserFollowingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserFollowingsQuery, GetUserFollowingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFollowingsQuery, GetUserFollowingsQueryVariables>(GetUserFollowingsDocument, options);
        }
export type GetUserFollowingsQueryHookResult = ReturnType<typeof useGetUserFollowingsQuery>;
export type GetUserFollowingsLazyQueryHookResult = ReturnType<typeof useGetUserFollowingsLazyQuery>;
export type GetUserFollowingsSuspenseQueryHookResult = ReturnType<typeof useGetUserFollowingsSuspenseQuery>;
export type GetUserFollowingsQueryResult = Apollo.QueryResult<GetUserFollowingsQuery, GetUserFollowingsQueryVariables>;