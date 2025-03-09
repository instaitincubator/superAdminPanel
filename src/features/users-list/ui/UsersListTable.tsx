import React from 'react';

import {tableHeaderOptions} from "@/features/users-list/CONSTs";
import {User} from "@/shared/types/graphTypes";
import {Table} from "@/shared/ui/Table/TableRoot";
import {formatDate} from "@/shared/utils/formatDate";
import {SortDirection} from "@/types";

interface Props {
    users: Omit<User, 'profile'>[]
    sortHandler: (e: { direction: "asc" | "desc"; key: string }) => void
    sortDirection: { direction: SortDirection; key: string; }
    }

export const UsersListTable = ({users, sortDirection, sortHandler}: Props) => {
    return (
        <div className="w-full overflow-x-auto">
            <Table.TableRoot>
                <Table.TableHeader
                    columns={tableHeaderOptions}
                    onSort={e => sortHandler(e!)}
                    sort={sortDirection}
                />
                <Table.TableBody>
                    {users?.map((user, index) => (
                        <Table.TableRow key={index}>
                            <Table.TableCell>{user.id}</Table.TableCell>
                            <Table.TableCell>{user.userName}</Table.TableCell>
                            <Table.TableCell>{user.email}</Table.TableCell>
                            <Table.TableCell>{formatDate(user.createdAt)}</Table.TableCell>
                            <Table.TableCell></Table.TableCell>
                        </Table.TableRow>
                    ))}
                </Table.TableBody>
            </Table.TableRoot>
        </div>
    );
};
