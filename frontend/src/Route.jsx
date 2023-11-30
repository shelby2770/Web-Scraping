import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ShowError from "./ShowError";

const create_route = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ShowError></ShowError>,
  },
]);
export default create_route;
