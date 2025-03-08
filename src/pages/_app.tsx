import type { AppProps } from "next/app"

import { ReactElement, ReactNode } from "react"

import { ApolloProvider } from "@apollo/client"
import { NextPage } from "next"

import "@/app/globals.css"

import client from "../../apollo-client"

export type NextPageWithLayout<P = object, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ApolloProvider client={client}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  )
}
