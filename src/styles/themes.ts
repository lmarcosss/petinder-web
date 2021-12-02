import { extendTheme  } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
        overflowY: "auto",

      },
      body: {
        width: "100%",
        color: "gray.600",
      },
    },
  },
});
