export async function fetchingAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const result = await response.json();

  if (!response.ok) {
    throw new Error("error on fetching the data");
  }

  return result.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body:  JSON.stringify({places: places}) ,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("error on sending the data...");
  }

  const result = await response.json();

  return result.message;
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');
  const result = await response.json();
  if (!response.ok) {
    throw new Error ('Failed to fetch user places');
  }

  return result.places;
}
