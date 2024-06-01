import React from "react";
import SignIn from "./views/auth/SignIn";
import MainDashboardAdmin from "./views/admin/default";
import { MdInterests } from "react-icons/md";
import Blog from "./views/admin/blog";
import ManageEvent from "./views/admin/event";
import ManageAccount from "./views/admin/account";
import { MdSupervisorAccount } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { BsFileEarmarkPost } from "react-icons/bs";
import Profile from "./views/admin/profile";
import { CgProfile } from "react-icons/cg";
import IndexV3 from "./views/admin/interest/indexv3";
import Report from "./views/admin/report";
import { VscReport } from "react-icons/vsc";
import ReportUser from "./views/admin/report/reportUser";
import { AiOutlineHome } from "react-icons/ai";
import ReportEvent from "./views/admin/report/reportEvent";
import Schedule from "./views/admin/schedule";
import { GrSchedule } from "react-icons/gr";
import Address from "./views/admin/address";
import { FaSearchLocation } from "react-icons/fa";

const routes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    component: <SignIn />,
  },
  {
    name: <p className="text-[19px]">Trang chủ</p>,
    layout: "/admin",
    icon: <AiOutlineHome style={{ width: "30px", height: "30px" }} />,
    path: "default",
    component: <MainDashboardAdmin />,
  },
  {
    name: <p className="text-[19px]">Chủ đề quan tâm</p>,
    layout: "/admin",
    icon: <MdInterests style={{ width: "30px", height: "30px" }} />,
    path: "interest",
    component: <IndexV3 />,
  },
  {
    name: <p className="text-[19px]">Tài khoản</p>,
    layout: "/admin",
    icon: <MdSupervisorAccount style={{ width: "30px", height: "30px" }} />,
    path: "account",
    component: <ManageAccount />,
  },
  {
    name: <p className="text-[19px]">Cuộc hẹn</p>,
    layout: "/admin",
    icon: <GrSchedule style={{ width: "30px", height: "30px" }} />,
    path: "schedule",
    component: <Schedule />,
  },
  {
    name: <p className="text-[19px]">Sự kiện</p>,
    layout: "/admin",
    icon: <MdEvent style={{ width: "30px", height: "30px" }} />,
    path: "event",
    component: <ManageEvent />,
  },
  {
    name: <p className="text-[19px]">Bài viết</p>,
    layout: "/admin",
    icon: <BsFileEarmarkPost style={{ width: "30px", height: "30px" }} />,
    path: "blog",
    component: <Blog />,
  },
  {
    name: <p className="text-[19px]">Báo cáo</p>,
    layout: "/admin",
    icon: <VscReport style={{ width: "30px", height: "30px" }} />,
    path: "report",
    component: <Report />,
  },
  // {
  //   name: <p className="text-[19px]">Địa chỉ</p>,
  //   layout: "/admin",
  //   icon: <FaSearchLocation style={{ width: "30px", height: "30px" }} />,
  //   path: "address",
  //   component: <Address />,
  // },
  {
    name: <p className="text-[19px]">Hồ sơ</p>,
    layout: "/admin",
    icon: <CgProfile style={{ width: "30px", height: "30px" }} />,
    path: "profile",
    component: <Profile />,
  },
  {
    name: "",
    layout: "/admin",
    path: "report/reportUser",
    component: <ReportUser />,
  },
  {
    name: "",
    layout: "/admin",
    path: "report/reportEvent",
    component: <ReportEvent />,
  },
];

export default routes;
