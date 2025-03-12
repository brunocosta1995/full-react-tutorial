// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../src/pages/Home";
import Events, { loader as loaderEvents } from "../src/pages/Events";
import EventDetail, {
  loader as loaderEventsDetail,
  action as eventDetailAction,
} from "../src/pages/EventDetail";
import NewEvent from "../src/pages/NewEvent";
import EditEvent from "../src/pages/EditEvent";
import Root from "../src/pages/Root";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import NewsLetterPage, {action as newsLetterAction} from './pages/Newsletter';
import { action as eventFormAction } from "./components/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: loaderEvents,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: loaderEventsDetail,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: eventDetailAction,
              },
              { path: "edit", element: <EditEvent />, action: eventFormAction },
            ],
          },
          { path: "new", element: <NewEvent />, action: eventFormAction },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsLetterPage />,
        action: newsLetterAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
