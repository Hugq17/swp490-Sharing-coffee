import React from "react";
import { Link, useLocation } from "react-router-dom"

export function SidebarLinks(props) {
    let location = useLocation();
    const { routes } = props;

    const activeRoute = (routeName) => {
        return location.pathname.includes(routeName);
    }

    const createLinks = (routes) => {
        return routes.map((route, index) => {
            if (
                route.layout === "/admin" ||
                route.layout === "/auth"
            ) {
                return (
                    <Link key={index} to={route.layout + "/" + route.path}>
                        <div></div>
                    </Link>
                )
            }
        })
    }
}