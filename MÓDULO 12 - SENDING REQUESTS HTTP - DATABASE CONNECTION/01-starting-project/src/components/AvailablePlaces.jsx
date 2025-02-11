import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchingAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  /* JEITO ANTIGO USANDO PROMISES
  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []); */

  async function fetchPlaces() {
    setIsFetching(true);

    try {
      const resultPlaces = await fetchingAvailablePlaces();
     
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(
          resultPlaces,
          position.coords.latitude,
          position.coords.longitude
        );
        setAvailablePlaces(sortedPlaces);
        setIsFetching(false);
      });
    } catch (error) {
      setError({ message: "Failed to fetch the data" || error.message });
      console.log("Error on fetching", error.message);
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An error ocurred..." message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText={"Fetching places data..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
