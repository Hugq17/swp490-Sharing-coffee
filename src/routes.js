import React from "react";
import SignIn from "./views/auth/SignIn";
import MainDashboardAdmin from './views/admin/default'
import Interest from './views/admin/interest'
import { MdInterests } from "react-icons/md";
import Forgotpassword from "./views/auth/Forgotpassword";
import Blog from "./views/admin/blog";
import ManageEvent from "./views/admin/event";
import ManageAccount from "./views/admin/account";
import { MdSupervisorAccount } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { BsFileEarmarkPost } from "react-icons/bs";
import Matching from "./views/admin/matching";
import { TbHeartSearch } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationForUser from "./views/admin/notification";
import Profile from "./views/admin/profile";
import { CgProfile } from "react-icons/cg";
import Interestv2 from "./views/admin/interest/indexv2";
import Upload from "./views/admin/interest/UploadImg";
import CloudinaryUpload from "./views/admin/interest/UploadImg";
import IndexV3 from "./views/admin/interest/indexv3";



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
        name: "Chủ đề quan tâm",
        layout: "/admin",
        icon: <MdInterests style={{ width: '50px', height: '50px' }} />,
        path: "interest",
        component: <IndexV3 />
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
    {
        name: "Thông báo",
        layout: "/admin",
        icon: <IoMdNotificationsOutline style={{ width: '50px', height: '50px' }} />,
        path: "notifications",
        component: <NotificationForUser />
    },
    {
        name: "Admin",
        layout: "/admin",
        icon: <CgProfile style={{ width: '50px', height: '50px' }} />,
        path: "profile",
        component: <Profile />
    },
]

export default routes