import React from "react";
import SignIn from "./views/auth/SignIn";
import MainDashboardAdmin from './views/admin/default'
import Interest from './views/admin/interest'
import Hobbies from "./components/icons/Hobbies";
import Users from "./components/icons/Users";
import Events from "./components/icons/Events";
import Blogs from "./components/icons/Blogs";
import Forgotpassword from "./views/auth/Forgotpassword";
import Blog from "./views/admin/blog";
import ManageEvent from "./views/admin/event";
import ManageAccount from "./views/admin/account";

const routes = [
    {
        name: "Sign In",
        layout: "/auth",
        path: "sign-in",
        component: <SignIn />,
    },
    {
        name: "Forget Password",
        layout: "/auth",
        path: "Forget-Password",
        component: <Forgotpassword />,
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
    {
        name: "Tài khoản",
        layout: "/admin",
        icon: <Users className="h-6 w-6" />,
        path: "account",
        component: <ManageAccount />
    },
    {
        name: "Sự kiện",
        layout: "/admin",
        icon: <Events className="h-6 w-6" />,
        path: "event",
        component: <ManageEvent />
    },
    {
        name: "Bài viết",
        layout: "/admin",
        icon: <Blogs className="h-6 w-6" />,
        path: "blog",
        component: <Blog />
    },
]

export default routes