import { Playfair_Display as Font2 } from "next/font/google";
import { Nunito_Sans as Font1 } from "next/font/google";

const font1 = Font1({
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

const font2 = Font2({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const FONTS = {
  font1: font1.className,
  font2: font2.className,
  variable1: font1.variable,
  variable2: font2.variable,
};

export default FONTS;
