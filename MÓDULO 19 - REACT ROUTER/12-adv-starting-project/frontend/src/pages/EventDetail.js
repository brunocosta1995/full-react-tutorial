import { redirect, useRouteLoaderData, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventList from "../components/EventsList";
import { Suspense } from "react";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export async function loaderEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify(
        { message: "Error on fetching the event detail" },
        { status: 500 }
      )
    );
  } else {
    const data = await response.json();
    return data.event;
  }
}

export async function loaderAllEvents() {
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

export async function loader({ request, params }) {
  const eventId = params.id;

  return {
    event: await loaderEvent(eventId), //essa propriedade é carregado primeiro que a próxima
    events: loaderAllEvents(),
  };
}

export async function action({ request, params }) {
  const eventId = params.id;

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not delete the event" }),
      { status: 500 }
    );
  }

  return redirect("/events");
}
