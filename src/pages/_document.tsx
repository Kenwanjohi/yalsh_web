import { Html, Head, Main, NextScript } from "next/document";
import { fonts } from "@/lib/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`${fonts.mono.className} ${fonts.poppins.className}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
