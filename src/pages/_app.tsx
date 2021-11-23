import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { SidebarDrawerProvider } from '@contexts/SidebarDrawerContext';

function App({ Component, pageProps }) {
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

export default App;
