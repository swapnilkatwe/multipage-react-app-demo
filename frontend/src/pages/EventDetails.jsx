import { useParams } from "react-router-dom";
export default function EventDetails() {
  const params = useParams();
  return (
    <>
    <h1>Event Details Page</h1>
    <p>Event Id is {params.eventId}</p>
    </>
  )
}
