import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Event";
import EventDetails from "./pages/EventDetails";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import RootLayout from "./pages/RootLayout";
import ErrorDetail from "./components/ErrorDetail";
import EventsRoot from "./pages/EventsRoot";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorDetail />,
      children: [
        // With Relative paths
        { index: true, element: <Home /> },
        {
          path: "events",
          element: <EventsRoot />,
          children: [
            { index: true, element: <Event />, loader: async () => {
              const response = await fetch('http://localhost:8080/events');
              if (!response.ok) {
                //...
              } else {
                const resData = await response.json();
                return resData.events;
              }
              }
            },
            { path: ":eventId", element: <EventDetails /> },
            { path: "new", element: <NewEvent /> },
            { path: ":eventId/edit", element: <EditEvent /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
