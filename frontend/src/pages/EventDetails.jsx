import { redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import { getAuthToken } from "../util/Auth";

export default function EventDetails() {
  const data = useRouteLoaderData("event-details"); // useRouteLoaderData takes id and useLoaderData dont take id.
  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw new Response(
      JSON.stringify(
        { message: "Could not fetch the details for event" },
        { status: 500 }
      )
    );
  } else {
    return response;
  }
}

// Delete Action
export async function action({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not delete the event" }, { status: 500 })
    );
  }
  return redirect("/events");
}
