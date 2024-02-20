import React from "react";
import SignIn from "./views/auth/SignIn";
import MainDashboardAdmin from './views/admin/default'
import Interest from './views/admin/interest'
import Hobbies from "./components/icons/Hobbies";

const routes = [
    {
        name: "Sign In",
        layout: "/auth",
        path: "sign-in",
        component: <SignIn />,
    },
    {
        name: "Trang chủ",
        layout: "/admin",
        path: "default",
        component: <MainDashboardAdmin />
    },
    {
        name: "Chủ để quan tâm",
        layout: "/admin",
        icon: <Hobbies className="h-6 w-6" />,
        path: "interest",
        component: <Interest />
    },
]

export default routes