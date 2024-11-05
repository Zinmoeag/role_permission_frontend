import Create from "./create";
import List from "./List";

export const routes = [
  {
    path: "",
    element : <List />  
  },
  {
    path: "create",
    element: <Create />,
  },
];
