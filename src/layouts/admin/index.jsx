import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import routes from "../../routes.js";

export default function Admin(props) {
    const { ...rest } = props;
    const location = useLocation();
    const [open, setOpen] = useState(true);
    const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

    const handleCloseSidebar = () => {
        setOpen(!open); // Đặt trạng thái của sidebar thành false (đóng)
    };

    useEffect(() => {
        window.addEventListener("resize", () =>
            window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
        );
    }, []);
    useEffect(() => {
        getActiveRoute(routes);
    }, [location.pathname]);

    const getActiveRoute = (routes) => {
        let activeRoute = "Main Dashboard";
        for (let i = 0; i < routes.length; i++) {
            if (
                window.location.href.indexOf(
                    routes[i].layout + "/" + routes[i].path
                ) !== -1
            ) {
                setCurrentRoute(routes[i].name);
            }
        }
        return activeRoute;
    };
    // const getActiveNavbar = (routes) => {
    //     let activeNavbar = false;
    //     for (let i = 0; i < routes.length; i++) {
    //         if (
    //             window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
    //         ) {
    //             return routes[i].secondary;
    //         }
    //     }
    //     return activeNavbar;
    // };
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route path={`/${prop.path}`} element={prop.component} key={key} />
                );
            } else {
                return null;
            }
        });
    };
    // document.documentElement.dir = "ltr";
    return (
        <div className="flex h-full w-full bg-zinc-950">
            <Sidebar open={open} onClose={() => setOpen(true)} />
            {/* Navbar & Main Content */}
            <div className="h-full w-full bg-white">
                {/* Main Content */}
                <main
                    className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[200px]`}
                >
                    <div className="h-full">
                        <div className="pt-5s mx-auto mb-auto w-full h-full  p-2 md:pr-2">
                            <Routes>
                                {getRoutes(routes)}

                                <Route
                                    path="/"
                                    element={<Navigate to="/admin/default" replace />}
                                />
                            </Routes>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
