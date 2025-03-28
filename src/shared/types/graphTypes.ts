import { PostsByUserModel, PostsPaginationModel } from "@/types"

type ID = string
type DateTime = string
type Nullable<T> = T | null

export interface User {
  id: number
  userName: string
  email: string
  createdAt: DateTime
  profile: Profile
  userBan?: UserBan | null
}

interface Profile {
  id: number
  userName?: string
  firstName?: string
  lastName?: string
  aboutMe?: string
  city?: string
  country?: string
  region?: string
  dateOfBirth?: DateTime
  createdAt: DateTime
  avatars?: Avatar[]
}

export type Owner = {
  firstName: string
  lastName: string
}

export interface Avatar {
  fileSize?: number
  height?: number
  width?: number
  url?: string
}

interface UserBan {
  createdAt: DateTime
  reason: string
  __typename?: string
}

interface Subscription {
  postAdded: Post
}

interface Post {
  id: number
  description: string
  createdAt: DateTime
  updatedAt: DateTime
  ownerId: number
  postOwner: PostOwnerModel
  images?: ImagePost[]
  userBan?: UserBan
}

interface PostOwnerModel {
  id: number
  userName: string
  firstName?: string
  lastName?: string
  avatars?: Avatar[]
}

export interface ImagePost {
  __typename: 'ImagePost'
  id?: number
  url?: string
  width?: number
  height?: number
  fileSize?: number
  createdAt?: DateTime
}

interface PaginationModel {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

interface UsersPaginationModel {
  pagination: PaginationModel
  users: User[]
}

enum SubscriptionType {
  DAY = "DAY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  PAYPAL = "PAYPAL",
  STRIPE = "STRIPE",
}

enum CurrencyType {
  EUR = "EUR",
  USD = "USD",
}

enum StatusSubscriptionType {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  FINISHED = "FINISHED",
  PENDING = "PENDING",
}

interface Payment {
  id?: number
  amount?: number
  createdAt?: DateTime
  currency?: CurrencyType
  endDate?: DateTime
  userId?: number
  paymentMethod?: PaymentMethod
  type?: SubscriptionType
}

interface SubscriptionByPaymentModel {
  id: string
  businessAccountId: number
  status: StatusSubscriptionType
  type: SubscriptionType
  price: number
  payments: Payment[]
  paymentType?: PaymentMethod
  startDate?: DateTime
  endDate?: DateTime
  dateOfPayment?: DateTime
}

interface SubscriptionPaymentsModel {
  id?: number
  amount?: number
  createdAt?: DateTime
  currency?: CurrencyType
  endDate?: DateTime
  userId?: number
  userName: string
  paymentMethod: PaymentMethod
  type: SubscriptionType
  avatars?: Avatar[]
}

interface PaymentsPaginationModel {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
  items: SubscriptionPaymentsModel[]
}

interface PaymentPaginationModel {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
  items: SubscriptionByPaymentModel[]
}

interface Follow {
  id: number
  userId: number
  userName?: string
  createdAt: DateTime
}

interface FollowPaginationModel {
  items: Follow[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export enum UserBlockStatus {
  ALL = "ALL",
  BLOCKED = "BLOCKED",
  UNBLOCKED = "UNBLOCKED",
}

export enum SortBy {
  userName = "userName",
  createdAt = "createdAt",
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

interface Query {
  getUsers: UsersPaginationModel
  getUser: User
  getPosts: PostsPaginationModel
  getPostsByUser: PostsByUserModel
  getFollowers: FollowPaginationModel
  getFollowing: FollowPaginationModel
  getPayments: PaymentsPaginationModel
  getPaymentsByUser: PaymentPaginationModel
}

interface QueryGetUsersArgs {
  pageNumber?: number
  pageSize?: number
  searchTerm?: string
  sortBy?: string
  sortDirection?: SortDirection
  statusFilter?: UserBlockStatus
}

interface QueryGetPostsArgs {
  endCursorPostId?: number
  pageSize?: number
  searchTerm?: string
  sortBy?: string
  sortDirection?: SortDirection
}

interface QueryGetUserArgs {
  userId: number
}

interface QueryGetFollowersArgs {
  userId: number
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

interface QueryGetFollowingArgs {
  userId: number
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

interface QueryGetPaymentsByUserArgs {
  userId: number
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

interface Mutation {
  banUser: boolean
  unbanUser: boolean
  removeUser: boolean
  loginAdmin: LoginAdmin
}

interface LoginAdmin {
  logged: boolean
}

interface MutationBanUserArgs {
  userId: number
  banReason: string
}

interface MutationUnbanUserArgs {
  userId: number
}

interface MutationRemoveUserArgs {
  userId: number
}

export interface MutationLoginAdminArgs {
  email: string
  password: string
}
