import { Space_Mono, Poppins } from "next/font/google";

const mono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export const fonts = {
  mono,
  poppins
};
