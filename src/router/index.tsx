import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import AppLayout from "../components/AppLayout";
import SignIn from "../pages/auth/signIn";
import SignUp from "../pages/auth/signUp";
import ProtectedRoute from "../pages/protectedRoute";
import Dashboard from "../pages/dashboard";
import ErrorBoundaryRouter from "../components/ErrorBoundaryRouter";
import Products from "../pages/product";
import PlzVerify from "../pages/auth/plzverrify";
import VerifyEmail from "../pages/auth/verifyEmail";
import ThemePage from "../pages/setting/theme";

const routes = createBrowserRouter([
    {
        path : "",
        element : <><Outlet /></>,
        //router error boundary 
        ErrorBoundary : ErrorBoundaryRouter,
        children : [
            {
                path : "sign_in",
                element : <SignIn />
            },
            {
                path : "sign_up",
                element : <SignUp  />
            },
            {
                path : "verify",
                element : <PlzVerify  />
            },
            {
                path : "verify_email/:verificationCode",
                element : <VerifyEmail  />
            },
            {
                path : "dashboard",
                element : <>
                    <ProtectedRoute allowedRolrmes={["USER","ADMIN"]}>
                        <AppLayout />
                    </ProtectedRoute>
                </>,
                children : [
                    {
                        path  : "setting",
                        element : <><Outlet /></>,
                        children : [
                            {
                                path : "theme",
                                element : <ThemePage />
                            },
                        ]
                    },
                    // {
                    //     path : "dashboard",
                    //     element : <ProtectedRoute allowedRoles={["USER", "ADMIN"]}></ProtectedRoute>,
                    //     children : [
                    //         {
                    //             path : "",
                    //             element : <Dashboard />
                    //         },
                    //         {
                    //             path : "1",
                    //             element : <Dashboard />
                    //         },
                    //     ]
                    // },
                    {
                        path : "products",
                        element : <Products />
                    }
                ]
            },
        ]
    },
])


const AppRouter = () => {
    return (
        <RouterProvider 
        router={routes} 
        />
    )
}

export default AppRouter;