import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../types';
const defaultOptions = {} as const;

export type GetPostsQueryVariables = Types.Exact<{
  endCursorPostId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;

import * as Types from "../../types"
const defaultOptions = {} as const

export type GetPostsQueryVariables = Types.Exact<{
  endCursorPostId?: Types.InputMaybe<Types.Scalars["Int"]["input"]>
  pageSize?: Types.InputMaybe<Types.Scalars["Int"]["input"]>
  sortBy?: Types.InputMaybe<Types.Scalars["String"]["input"]>
  searchTerm?: Types.InputMaybe<Types.Scalars["String"]["input"]>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
}>

export type GetPostsQuery = {
  __typename?: "Query"
  getPosts: {
    __typename?: "PostsPaginationModel"
    pageSize: number
    pagesCount: number
    totalCount: number
    items: Array<{
      __typename?: "Post"
      id: number
      createdAt: any
      description: string
      ownerId: number
      updatedAt: any
      userBan?: {
        __typename?: "UserBan"
        createdAt: any
        reason: string
      } | null
      postOwner: {
        __typename?: "PostOwnerModel"
        id: number
        firstName?: string | null
        lastName?: string | null
        userName: string
        avatars?: Array<{
          __typename?: "Avatar"
          fileSize?: number | null
          height?: number | null
          url?: string | null
          width?: number | null
        }> | null
      }
      images?: Array<{
        __typename?: "ImagePost"
        url?: string | null
        width?: number | null
        height?: number | null
        fileSize?: number | null
        id?: number | null
        createdAt?: any | null
      }> | null
    }>
  }
}

export const GetPostsDocument = gql`
  query getPosts(
    $endCursorPostId: Int
    $pageSize: Int
    $sortBy: String
    $searchTerm: String
    $sortDirection: SortDirection
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      pageSize: $pageSize
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pageSize
      pagesCount
      totalCount
      items {
        id
        createdAt
        description
        ownerId
        updatedAt
        userBan {
          createdAt
          reason
        }
        postOwner {
          id
          avatars {
            fileSize
            height
            url
            width
          }
          firstName
          lastName
          userName
        }
        images {
          url
          width
          height
          fileSize
          id
          createdAt
        }
      }
    }
  }
`

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      endCursorPostId: // value for 'endCursorPostId'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      searchTerm: // value for 'searchTerm'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}

        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}

          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export function useGetPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}

          return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;