import {getSidebarLayout} from "@/app/layouts/sidebarLayout/sidebarLayout"
import {UsersList} from "@/features/users-list/UsersList";

export default function Users() {

    return (
        <UsersList/>
    )
}

Users.getLayout = getSidebarLayout
