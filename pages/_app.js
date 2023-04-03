import { SWRConfig } from "swr";
import GlobalStyle from "../styles";

export const fetcher = (URL) => fetch(URL).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher, refreshInterval: 5000 }}>
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    </SWRConfig>
  );
}
