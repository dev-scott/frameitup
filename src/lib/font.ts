import {
  Anton,
  Bebas_Neue,
  Festive,
  Goblin_One,
  Nunito,
  Playfair_Display,
} from "next/font/google";

// const inter = Inter({ subsets: ['latin'] })
export const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
export const goblin_one = Goblin_One({ weight: "400", subsets: ["latin"] });
export const nunito = Nunito({ subsets: ["latin"] });
export const festive = Festive({ weight: "400", subsets: ["latin"] });
export const anton = Anton({ weight: "400", subsets: ["latin"] });
export const playfair_Display = Playfair_Display({
  weight: "600",
  style: "normal",
  // preload: true,
  subsets: ["latin"],
});
