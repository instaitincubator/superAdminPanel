import {ApolloClient, createHttpLink, InMemoryCache, split} from "@apollo/client"
import {getMainDefinition} from "@apollo/client/utilities";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: 'https://inctagram.work/api/v1/graphql',
})

const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://inctagram.work/api/v1/graphql'
    })
)

const authLink = setContext(()=>{
    return {
    headers: {
        authorization: "Basic YWRtaW5AZ21haWwuY29tOmFkbWlu",
    }
    }
})


const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    authLink.concat(httpLink),
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
