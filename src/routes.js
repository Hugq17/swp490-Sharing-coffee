import React from "react";
import SignIn from "./views/auth/SignIn";
import MainDashboardAdmin from './views/admin/default'

const routes = [
    {
        name: "Sign In",
        layout: "/auth",
        path: "sign-in",
        component: <SignIn />,
    },
    {
        name: "Main Dashboard Admin",
        layout: "/admin",
        path: "default",
        component: <MainDashboardAdmin />
    }
]

export default routes