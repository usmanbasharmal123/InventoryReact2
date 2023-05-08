import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./view/auth/Login";
import Signup from "./view/auth/Signup";

import GuestLayout from "./component/GuestLayout";
import DefaultLayout from "./component/DefaultLayout";
import Survey from "./view/Survey";
import Dashboard from "./view/Dashboard";
import Users from "./view/users/Users";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Navigate to="/" />,
            },
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/surveys",
                element: <Survey />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            // {
            //     path: "/surveys/create",
            //     element: <SurveyView />,
            // },
            // {
            //     path: "/surveys/:id",
            //     element: <SurveyView />,
            // },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },

    // {
    //     path: "/survey/public/:slug",
    //     element: <SurveyPublicView />,
    // },
    // {
    //     path: "/dashboard",
    //     element: <DefaultLayout />,
    //     children: [
    //         {
    //             path: "survey",
    //             element: <Survey />,
    //         },
    //     ],
    // },
    // {
    //     path: "/",
    //     element: <GuestLayout />,
    //     children: [
    //         {
    //             path: "/login",
    //             element: <Login />,
    //         },
    //         {
    //             path: "/signup",
    //             element: <Signup />,
    //         },
    //     ],
    // },
]);
export default router;
