import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;
  if (data.isError) {
    return <p>{data.message}</p>;
  }

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError: true, message: "Could not fetch the data",};

    // return {message: 'Error on fetching the events'};

    throw new Response(
      JSON.stringify({ message: "Error on fetching the events" }),
      { status: 500 }
    );
  } else {
    return response;

    //a função loader possibilita esse tratamento ao realizar fetching
    // const resData = await response.json();
    // return resData.events;
  }
}
