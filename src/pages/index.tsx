import { gql, useQuery } from "@apollo/client"

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`
export default function Home() {
  const { loading, error, data } = useQuery(GET_LOCATIONS)
  console.log(error)
  if (loading) return null
  if (error) return <div>ЕРОР!</div>
  return <div>{data}</div>
}
