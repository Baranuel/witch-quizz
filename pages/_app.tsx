import "../global.css";
import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
