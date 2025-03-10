import React from "react"

import { tableHeaderOptions } from "@/features/users-list/CONSTs"
import { ActionWithUserMenu } from "@/features/users-list/ui/ActionWithUserMenu"
import { useUnbanUserMutation } from "@/queries/unBunUser/unBunUsergenerated"
import { BanIcon } from "@/shared/animate-svg/ban"
import { User } from "@/shared/types/graphTypes"
import { Table } from "@/shared/ui/Table/TableRoot"
import { formatDate } from "@/shared/utils/formatDate"
import { SortDirection } from "@/types"
import { useApolloClient } from "@apollo/client"

interface Props {
  users: Omit<User, "profile">[]
  sortHandler: (e: { direction: "asc" | "desc"; key: string }) => void
  sortDirection: { direction: SortDirection; key: string }
}

export const UsersListTable = ({
  users,
  sortDirection,
  sortHandler,
}: Props) => {
  const client = useApolloClient()

  const [unbanUserMutation] = useUnbanUserMutation()
  const unbunUserHandler = (userId: number) => {
    void unbanUserMutation({
      variables: {
        userId: userId,
      },
      onCompleted: () => {
        client.refetchQueries({ include: "active" })
      },
    })
  }

  return (
    <div className="w-full">
      <Table.TableRoot>
        <Table.TableHeader
          columns={tableHeaderOptions}
          onSort={e => sortHandler(e!)}
          sort={sortDirection}
        />
        <Table.TableBody>
          {users?.map((user, index) => (
            <Table.TableRow key={index}>
              <Table.TableCell>
                <div className="flex gap-4 items-center">
                  <div
                    className="min-w-[50px]"
                    onClick={() => unbunUserHandler(user.id)}
                  >
                    {user.userBan !== null && <BanIcon />}
                  </div>
                  <div>{user.id}</div>
                </div>
              </Table.TableCell>
              <Table.TableCell>{user.userName}</Table.TableCell>
              <Table.TableCell>{formatDate(user.createdAt)}</Table.TableCell>
              <Table.TableCell className="w-full">
                <ActionWithUserMenu
                  index={index}
                  usersLength={users.length}
                  userId={user.id}
                />
              </Table.TableCell>
            </Table.TableRow>
          ))}
        </Table.TableBody>
      </Table.TableRoot>
    </div>
  )
}
