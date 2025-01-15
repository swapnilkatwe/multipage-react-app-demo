import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventList";

function EventsPage() {
  const data = useLoaderData(); // useLoaderData() reads by react and automatically extracts data from promise which comes from async api call from app.js file.
  // Also useLoaderData() can be use to get data in same element that assinged to root AND in call comopnents that are inside of that element. like in EventList
  const events = data.events;
  return <>{<EventsList events={events} />}</>;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    //...
  } else {
    // const resData = await response.json();
    return response; // useLoaderData automatically will extract data from the response
  }
}
