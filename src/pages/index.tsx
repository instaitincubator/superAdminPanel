import {useGetProfileInfoQuery} from "@/queries/usersgenerated";


export default function Home() {
    const userID = 10
    const { data, loading, error } = useGetProfileInfoQuery({
        variables: {
            userID,
        },
    })

    if (loading) return null
    if (error) return <div> {JSON.stringify(error)} </div>
    return <div>{data?.getUser.userName}</div>
}
