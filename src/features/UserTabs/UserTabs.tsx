import React from 'react';
import {Photos} from "@/features/Photos/Photos";
import {UserPayments} from "@/features/UserPayments/UserPayments";
import {Followers} from "@/features/Followers/Followers";
import {Followings} from "@/features/Followings/Followings";

type Props = {
    query: string
    userId: number
}

const routes = {
    "uploaded-photos": <Photos/>,
    "payments": <UserPayments/>,
    "followers": <Followers/>,
    "followings": <Followings/>
}

export const UserTabs = (props:Props) => {

    const {query} = props

    return (
        <div>
            {routes[query as keyof typeof routes]}
        </div>
    );
};
