import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import SideNavBar from "./sidebar/SideNavbar";
import TopNavbar from "./topnavbar/TopNavbar";

export default function DefaultLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();
    if (!userToken) {
        return <Navigate to="/login" />;
    }
    const [scriptLoadingState, setScriptLoadingState] = useState("IDLE");

    setTimeout(() => {
        const Script = "script.js";
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = Script;
        script.onload = function () {
            setScriptLoadingState("LOADED");
        };
        script.onerror = function () {
            setScriptLoadingState("FAILED");
        };
        document.body.appendChild(script);
        // console.log("your are here");
    }, 1000);

    return (
        <>
            <SideNavBar />
            <section id="content">
                <TopNavbar />
                <main>
                    <Outlet />
                </main>
            </section>
            {scriptLoadingState}
        </>
    );
}
