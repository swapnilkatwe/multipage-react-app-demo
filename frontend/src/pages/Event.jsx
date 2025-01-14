import {NavLink} from "react-router-dom";

const DummyData = [
  { id: "e1", title: "Event One" },
  { id: "e2", title: "Event Two" },
];
export default function Event() {
  return (
    <ul>
      {DummyData.map((event) => {
        return <li key={event.id}>
          <NavLink to={event.id}>{event.title}</NavLink>
          </li>;
      })}
    </ul>
  );
}
