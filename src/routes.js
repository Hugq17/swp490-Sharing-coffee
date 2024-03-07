import React from "react";
import SignIn from "./views/auth/SignIn";
import MainDashboardAdmin from './views/admin/default'
import Interest from './views/admin/interest'
import Hobbies from "./components/icons/Hobbies";
import Users from "./components/icons/Users";
import Events from "./components/icons/Events";
import { MdInterests } from "react-icons/md";
import Blogs from "./components/icons/Blogs";
import Forgotpassword from "./views/auth/Forgotpassword";
import Blog from "./views/admin/blog";
import ManageEvent from "./views/admin/event";
import ManageAccount from "./views/admin/account";
import { MdSupervisorAccount } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { BsFileEarmarkPost } from "react-icons/bs";
import SignInMod from "./views/auth/SignInMod";
import Matching from "./views/admin/matching";
import { TbHeartSearch } from "react-icons/tb";

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
        name: "Sign In with Mod",
        layout: "/auth",
        path: "sign-in-with-mod",
        component: <SignInMod />,
    },
    {
        name: "Trang chủ",
        layout: "/admin",
        path: "default",
        component: <MainDashboardAdmin />
    },
    {
        name: "Chủ đề quan tâm",
        layout: "/admin",
        icon: <MdInterests style={{ width: '50px', height: '50px' }} />,
        path: "interest",
        component: <Interest />
    },
    {
        name: "Người dùng",
        layout: "/admin",
        icon: <MdSupervisorAccount style={{ width: '50px', height: '50px' }} />,
        path: "account",
        component: <ManageAccount />
    },
    {
        name: "Sự kiện",
        layout: "/admin",
        icon: <MdEvent style={{ width: '50px', height: '50px' }} />,
        path: "event",
        component: <ManageEvent />
    },
    {
        name: "Bài viết",
        layout: "/admin",
        icon: <BsFileEarmarkPost style={{ width: '50px', height: '50px' }} />,
        path: "blog",
        component: <Blog />
    },
    {
        name: "Matching",
        layout: "/admin",
        icon: <TbHeartSearch style={{ width: '50px', height: '50px' }} />,
        path: "matching",
        component: <Matching />
    },
]

export default routes