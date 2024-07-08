import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "../components/AppLayout";
import SignIn from "../pages/auth/signIn";
import NotFound from "../pages/errors/not_found";
import SignUp from "../pages/auth/signUp";
import ProtectedRoute from "../pages/protectedRoute";
import Dashboard from "../pages/dashboard";
import Pokemon from "../pages/pokemon";

const routes = createBrowserRouter([
    {
        path : "/",
        element : <AppLayout />,
        children : [
            {
                path : "sign_in",
                element : <SignIn  />
            },
            {
                path : "sign_up",
                element : <SignUp  />
            },
            {
                path : "dashboard",
                element : <ProtectedRoute allowedRoles={["USER"]} />,
                children : [
                    {
                        path : "",
                        element : <Dashboard />
                    },
                    {
                        path : "1",
                        element : <Dashboard />
                    },
                ]
            },
            {
                path : "/pokemon",
                element : <Pokemon />
            }
        ]
    },
   
    //not_found_route
    {
        path : "*",
        element : <NotFound />
    }
])


const AppRouter = () => {
    return (
        <RouterProvider 
        router={routes} 
        />
    )
}

export default AppRouter;