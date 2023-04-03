import { useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";
const fetcher = (URL) => fetch(URL).then((response) => response.json());

export default function ISSTracker() {
  const { data, error, isLoading, mutate } = useSWR(URL, fetcher, {
    refreshInterval: 5000,
  });

  if (error) {
    return (
      <h2>
        Wow, so that really happened huh? (This is a horrible error message)
      </h2>
    );
  }

  if (isLoading) {
    return (
      <h2>
        Aaaa... uhmm wait for a bit, I&apos;ll be right there with some fresh
        data :D
      </h2>
    );
  }

  /// original, unnecessary code from the exercise's initial state
  // const [coords, setCoords] = useState({
  //   longitude: 0,
  //   latitude: 0,
  // });

  // async function getISSCoords() {
  //   try {
  //     const response = await fetch(URL);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setCoords({ longitude: data.longitude, latitude: data.latitude });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     getISSCoords();
  //   }, 5000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <main>
      {data && (
        <>
          <Map longitude={data.longitude} latitude={data.latitude} />
          <Controls
            longitude={data.longitude}
            latitude={data.latitude}
            onRefresh={() => mutate()}
          />
        </>
      )}
    </main>
  );
}
