import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import EventsList from "../components/EventList";

function EventsPage() {
  // -->NOTE 1: Code for async api call and waiting to get data from async api call and render page after that.
  // const data = useLoaderData(); // useLoaderData() reads by react and automatically extracts data from promise which comes from async api call from app.js file.
  // // Also useLoaderData() can be use to get data in same element that assinged to root AND in call comopnents that are inside of that element. like in EventList
  // const events = data.events;
  // return <EventsList events={events} />

  // -->NOTE 2: Code for async api call and rendering page with showing other components and load async data afterwords.
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(
      JSON.stringify(
        { message: "Could Not fetch events." },
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    );
    //...
  } else {
    // -->NOTE 2
    const resData = await response.json();
    // --> NOTE 1
    // const resData = await response.json();
    // return response; // useLoaderData automatically will extract data from the response
    return resData.events;
  }
}
export function loader() {
  return {
    events: loadEvents(), // events must return a promise and loadEvents returning the promise as async function.
  };
}
