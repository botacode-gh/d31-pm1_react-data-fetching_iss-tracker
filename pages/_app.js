import { SWRConfig } from "swr";
import GlobalStyle from "../styles";

// fetch API using .then()
// export const fetcher = (URL) => fetch(URL).then((response) => response.json());

// fetch API using async
export const fetcher = async (URL) => {
  const response = await fetch(URL);

  // throw error if status code is in range 200–299
  if (!response.ok) {
    const error = new Error("I got an error while fetching the data.. :/");
    // give the error object some extra info
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      {/* wrap SWRConfig only around components that use swr */}
      <SWRConfig value={{ fetcher, refreshInterval: 5000 }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
