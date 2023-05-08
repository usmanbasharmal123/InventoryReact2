import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./router.jsx";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ContextProvider>
                <RouterProvider router={router}></RouterProvider>
                <ReactQueryDevtools />
            </ContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
