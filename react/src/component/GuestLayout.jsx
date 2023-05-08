import React, { useEffect, useState, CSSProperties } from "react";
import { Outlet } from "react-router-dom";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";

export default function GuestLayout() {
    return (
        <>
            <Card style={{ width: 500, marginLeft: 400, marginTop: 10 }}>
                <Outlet />
            </Card>
            {/* )} */};
        </>
    );
}
