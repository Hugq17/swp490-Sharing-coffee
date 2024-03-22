import React from "react";
import { Link, useLocation } from "react-router-dom"
import DashIcon from "../../icons/DashIcon";
import { AiOutlineHome } from "react-icons/ai";

export function SidebarLinks(props) {
    let location = useLocation();
    const { routes } = props;

    const activeRoute = (routeName) => {
        return location.pathname.includes(routeName);
    }

    const createLinks = (routes) => {
        return routes.map((route, index) => {
            if (
                route.layout === "/admin"
            ) {
                return (
                    <Link key={index} to={route.layout + "/" + route.path}>
                        <div className="relative mb-3 flex hover:cursor-pointer">
                            <li
                                className="my-[3px] flex cursor-pointer items-center px-8"
                                key={index}
                            >
                                <div className="flex justify-center items-center">
                                    <span
                                        className={`${activeRoute(route.path) === true
                                            ? "font-bold text-brand-500 dark:text-white"
                                            : "font-medium text-gray-600"
                                            }`}
                                    >
                                        {route.icon ? route.icon : <AiOutlineHome style={{ width: '50px', height: '50px' }} />}{" "}
                                    </span>
                                    <p
                                        className={`leading-1 ml-4 flex text-2xl ${activeRoute(route.path) === true
                                            ? "font-bold text-white dark:text-white"
                                            : "font-medium text-gray-600"
                                            }`}
                                    >
                                        {route.name}
                                    </p>
                                </div>
                            </li>
                            {activeRoute(route.path) ? (
                                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                            ) : null}
                        </div>
                    </Link>
                )
            }
        })
    }
    return createLinks(routes);
}
export default SidebarLinks;