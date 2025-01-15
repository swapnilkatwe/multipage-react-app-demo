import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventList';

function EventsPage() {
  const events = useLoaderData(); // useLoaderData() reads by react and automatically extracts data from promise which comes from async api call from app.js file.
  // Also useLoaderData() can be use to get data in same element that assinged to root AND in call comopnents that are inside of that element. like in EventList
  return (
    <>
      {<EventsList events={events} />}
    </>
  );
}

export default EventsPage;