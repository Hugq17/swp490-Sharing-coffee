import React from "react";
import SignIn from "./views/auth/SignIn";

const routes = [
    {
        name: "Sign In",
        layout: "/auth",
        path: "sign-in",
        component: <SignIn />,
    }
]

export default routes