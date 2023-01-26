import { AppProps } from "next/app";
import "../../styles/globals.css";
import "@tremor/react/dist/esm/tremor.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
