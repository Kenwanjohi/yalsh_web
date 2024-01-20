/* theme.ts */
import { extendTheme } from "@chakra-ui/react";
import { fonts } from "./lib/fonts";
export const theme = extendTheme({
  fonts: {
    heading: fonts.poppins.style.fontFamily,
    body: fonts.mono.style.fontFamily,
  },
});
