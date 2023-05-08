import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import axiosClient from "../../axios";
import { useStateContext } from "../../context/ContextProvider";

export default function SideNavbar() {
    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();
    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
        });
    };
    return (
        <>
            <section id="sidebar">
                <Link to="/" className="brand">
                    <i className="bx bxs-smile"></i>
                    <span className="text">AdminHub</span>
                </Link>
                <ul className="side-menu top">
                    <li className="active">
                        <Link to="/">
                            <i className="bx bxs-dashboard"></i>
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bxs-shopping-bag-alt"></i>
                            <span className="text">My Store</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bxs-doughnut-chart"></i>
                            <span className="text">Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bxs-message-dots"></i>
                            <span className="text">Message</span>
                        </a>
                    </li>
                    <li>
                        <Link to="/users">
                            <i className="bx bxs-group"></i>
                            <span className="text">Users</span>
                        </Link>
                    </li>
                </ul>
                <ul className="side-menu">
                    <li>
                        <a href="#">
                            <i className="bx bxs-cog"></i>
                            <span className="text">Settings</span>
                        </a>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="logout"
                            onClick={(ev) => logout(ev)}
                        >
                            <i className="bx bxs-log-out-circle"></i>
                            <span className="text">Logout</span>
                        </Link>
                        {/* <Button
                            as="a"
                            href="#"
                            onClick={(ev) => logout(ev)}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                            Sign out
                        </Button> */}
                    </li>
                </ul>
            </section>
        </>
    );
}
