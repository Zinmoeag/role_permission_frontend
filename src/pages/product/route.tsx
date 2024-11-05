import ProductDetail from "./detail";
import Products from ".";

export const productsRoutes = [
  {
    path: "",
    element: <Products />,
  },
  {
    path: ":productId",
    element: <ProductDetail />,
  },
];
