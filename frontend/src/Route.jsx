import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import ShowError from "./ShowError";

const create_route = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ShowError></ShowError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);
export default create_route;
