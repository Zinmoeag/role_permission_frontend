import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "../components/AppLayout";
import SignIn from "../pages/signIn";
import NotFound from "../pages/errors/not_found";

const routes = createBrowserRouter([
    {
        path : "/",
        element : <AppLayout />,
        children : [
            {
                path : "sign_in",
                element : <SignIn  />
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