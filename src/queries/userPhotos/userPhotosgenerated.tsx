import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserPhotosQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  endCursorId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetUserPhotosQuery = { __typename?: 'Query', getPostsByUser: { __typename: 'PostsByUserModel', pagesCount: number, pageSize: number, totalCount: number, items?: Array<{ __typename: 'ImagePost', id?: number | null, createdAt?: any | null, width?: number | null, height?: number | null, url?: string | null, fileSize?: number | null }> | null } };


export const GetUserPhotosDocument = gql`
    query GetUserPhotos($userId: Int!, $endCursorId: Int) {
  getPostsByUser(endCursorId: $endCursorId, userId: $userId) {
    __typename
    pagesCount
    pageSize
    totalCount
    items {
      id
      createdAt
      width
      height
      url
      fileSize
      __typename
    }
  }
}
    `;

/**
 * __useGetUserPhotosQuery__
 *
 * To run a query within a React component, call `useGetUserPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPhotosQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      endCursorId: // value for 'endCursorId'
 *   },
 * });
 */
export function useGetUserPhotosQuery(baseOptions: Apollo.QueryHookOptions<GetUserPhotosQuery, GetUserPhotosQueryVariables> & ({ variables: GetUserPhotosQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPhotosQuery, GetUserPhotosQueryVariables>(GetUserPhotosDocument, options);
      }
export function useGetUserPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPhotosQuery, GetUserPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPhotosQuery, GetUserPhotosQueryVariables>(GetUserPhotosDocument, options);
        }
export function useGetUserPhotosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserPhotosQuery, GetUserPhotosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserPhotosQuery, GetUserPhotosQueryVariables>(GetUserPhotosDocument, options);
        }
export type GetUserPhotosQueryHookResult = ReturnType<typeof useGetUserPhotosQuery>;
export type GetUserPhotosLazyQueryHookResult = ReturnType<typeof useGetUserPhotosLazyQuery>;
export type GetUserPhotosSuspenseQueryHookResult = ReturnType<typeof useGetUserPhotosSuspenseQuery>;
export type GetUserPhotosQueryResult = Apollo.QueryResult<GetUserPhotosQuery, GetUserPhotosQueryVariables>;