import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import SignIn from "../pages/auth/signIn";
import SignUp from "../pages/auth/signUp";
import ProtectedRoute from "../pages/protectedRoute";
import ErrorBoundaryRouter from "../components/ErrorBoundaryRouter";
import PlzVerify from "../pages/auth/plzverrify";
import VerifyEmail from "../pages/auth/verifyEmail";
import ThemePage from "../pages/setting/theme";
import Users from "../pages/users";
import { routes as RoleRoutes } from "../pages/role/route";
import { productsRoutes } from "../pages/product/route";
import GuestRoute from "../pages/guestRoute";

const routes = createBrowserRouter([
  {
    id: "root",
    path: "",
    element: (
      <>
        <Outlet />
      </>
    ),
    ErrorBoundary: ErrorBoundaryRouter,
    children: [
      {
        path: "sign_in",
        element: (
          <GuestRoute>
            <SignIn />
          </GuestRoute>
        ),
      },
      {
        path: "sign_up",
        element: <SignUp />,
      },
      {
        path: "verify",
        element: <PlzVerify />,
      },
      {
        path: "verify_email/:verificationCode",
        element: <VerifyEmail />,
      },
      {
        path: "dashboard",
        element: (
          <>
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <AppLayout />
            </ProtectedRoute>
          </>
        ),
        children: [
          {
            path: "",
            element: <>dashboard</>,
          },
          {
            path: "setting",
            element: (
              <>
                <Outlet />
              </>
            ),
            children: [
              {
                path: "theme",
                element: <ThemePage />,
              },
            ],
          },
          {
            path: "role",
            element: (
              <>
                <Outlet />
              </>
            ),
            children: [...RoleRoutes],
          },
          {
            path: "products",
            element: (
              <>
                <Outlet />
              </>
            ),
            children: [...productsRoutes],
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={routes} />;
};

export default AppRouter;
