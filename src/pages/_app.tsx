import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { SidebarDrawerProvider } from "@contexts/SidebarDrawerContext";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
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
