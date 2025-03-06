import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "ws://inctagram.work/api/v1/graphq",
  cache: new InMemoryCache(),
})

export default client
