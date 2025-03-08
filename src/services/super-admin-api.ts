import { createApi } from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from "@/services/auth/super-admin.base-query";

export const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: build => ({}),
    reducerPath: 'inctagram-api',
    tagTypes: ['Me', 'profile', 'Posts', 'sessions', 'currentSub', 'Notifications'],
})
