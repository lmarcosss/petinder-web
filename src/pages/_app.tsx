import Head from 'next/head';
import { ChakraProvider } from "@chakra-ui/react"

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>PeTinder</title>
      </Head>

      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App