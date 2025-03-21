import React from 'react';
import {Table} from "@/shared/ui/Table/TableRoot";
import {useGetUserQuery} from "@/queries/user/usergenerated";

type Props = {
    userId: number
}

export const UserCell = (props: Props) => {

    const {data: userData} = useGetUserQuery({
        variables: {
            userId: Number(props.userId)
        }
    })
    return (
        <Table.TableCell className="w-full">
            {userData?.getUser.email}
        </Table.TableCell>
    );
};