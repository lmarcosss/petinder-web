import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { SidebarDrawerProvider } from "@contexts";
import { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { AnnouncementProvider } from "@contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PeTinder</title>
      </Head>

      <CookiesProvider>
        <ChakraProvider>
          <SidebarDrawerProvider>
            <AnnouncementProvider>
              <Component {...pageProps} />
            </AnnouncementProvider>
          </SidebarDrawerProvider>
        </ChakraProvider>
      </CookiesProvider>
    </>
  );
}
