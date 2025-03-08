import { getLayout } from "@/app/layouts/mainLayout/Layout"
import { useGetProfileInfoQuery } from "@/queries/usersgenerated"

export default function Home() {
  const userID = 3
  const { data, loading, error } = useGetProfileInfoQuery({
    variables: {
      userID,
    },
  })

  if (loading) {
    return null
  }
  if (error) {
    return <div> {JSON.stringify(error)} </div>
  }

  return <div className={"border-10"}>{data?.getUser.userName}</div>
}

Home.getLayout = getLayout
