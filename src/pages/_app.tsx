import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { SidebarDrawerProvider } from "@contexts/SidebarDrawerContext";
import { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { CreateAnnouncementModalProvider } from "@contexts/createAnnouncementContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PeTinder</title>
      </Head>

      <CookiesProvider>
        <ChakraProvider>
          <SidebarDrawerProvider>
            <CreateAnnouncementModalProvider>
              <Component {...pageProps} />
            </CreateAnnouncementModalProvider>
          </SidebarDrawerProvider>
        </ChakraProvider>
      </CookiesProvider>

    </>
  );
}
