import { redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export async function loader({ request, params }) {
  const eventId = params.id;

  const response = await fetch("http://localhost:8080/events/" + eventId);

  if (!response.ok) {
    throw new Response(
      JSON.stringify(
        { message: "Error on fetching the event detail" },
        { status: 500 }
      )
    );
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  const eventId = params.id;

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({message: 'Could not delete the event'}),
      {status: 500}
    )
  }

  return redirect('/events');
}
