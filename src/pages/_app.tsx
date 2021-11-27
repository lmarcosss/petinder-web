import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { SidebarDrawerProvider } from '@contexts/SidebarDrawerContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>PeTinder</title>
      </Head>

      <ChakraProvider>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </>
  );
}
