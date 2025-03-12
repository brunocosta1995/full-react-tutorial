import { useLoaderData, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return (
    <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
    <Await resolve={events}>
      {(loadedEvents) => <EventsList events={loadedEvents}></EventsList>}
    </Await>
    </Suspense>
  );

  /*
  
  if (data.isError) {
    return <p>{data.message}</p>;
  }

  return (
    <>
      <EventsList events={events} />
    </>
  );
  */
}

export default EventsPage;

export async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError: true, message: "Could not fetch the data",};

    // return {message: 'Error on fetching the events'};

    throw new Response(
      JSON.stringify({ message: "Error on fetching the events" }),
      { status: 500 }
    );
  } else {
    const data = await response.json();
    return data.events;

    //a função loader possibilita esse tratamento ao realizar fetching
    // const resData = await response.json();
    // return resData.events;
  }
}

export async function loader() {
  return {
    events: loadEvents()
  }
}
