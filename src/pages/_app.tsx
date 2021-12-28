import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { SidebarDrawerProvider } from "@contexts";
import { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { AnnouncementModalProvider } from "@contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PeTinder</title>
      </Head>

      <CookiesProvider>
        <ChakraProvider>
          <SidebarDrawerProvider>
            <AnnouncementModalProvider>
              <Component {...pageProps} />
            </AnnouncementModalProvider>
          </SidebarDrawerProvider>
        </ChakraProvider>
      </CookiesProvider>
    </>
  );
}
