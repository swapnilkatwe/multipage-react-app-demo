import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Event, { loader as eventLoader } from "./pages/Event";
import EventDetails, {
  loader as eventDetailsLoader,
  action as deleteEventAction,
} from "./pages/EventDetails";
import NewEvent from "./pages/NewEvent";
import { action as manipulateEventAction } from "./components/EventForm";
import EditEvent from "./pages/EditEvent";
import RootLayout from "./pages/RootLayout";
import ErrorDetail from "./components/ErrorDetail";
import EventsRoot from "./pages/EventsRoot";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import AuthenticationPage from "./pages/Authentication";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorDetail />,
      children: [
        // With Relative paths
        { index: true, element: <Home /> },
        { path: "auth", element: <AuthenticationPage /> },
        {
          path: "events",
          element: <EventsRoot />,
          children: [
            { index: true, element: <Event />, loader: eventLoader },
            {
              path: ":eventId",
              id: "event-details",
              loader: eventDetailsLoader, // Shared loader for Event Details and Edit.
              children: [
                {
                  index: true,
                  element: <EventDetails />,
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEvent />,
                  action: manipulateEventAction,
                },
              ],
            },
            {
              path: "new",
              element: <NewEvent />,
              action: manipulateEventAction,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
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
