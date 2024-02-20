import React from "react";
import SignIn from "./views/auth/SignIn";
import MainDashboardAdmin from './views/admin/default'
import Interest from './views/admin/interest'

const routes = [
    {
        name: "Sign In",
        layout: "/auth",
        path: "sign-in",
        component: <SignIn />,
    },
    {
        name: "Homepage",
        layout: "/admin",
        path: "default",
        component: <MainDashboardAdmin />
    },
    {
        name: "Interest",
        layout: "/admin",
        path: "interest",
        component: <Interest />
    },
]

export default routes