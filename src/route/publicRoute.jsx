import React from "react";
import Layout from "../layout";
import Home from "../screens/home";
import VerifyOtpPage from "../screens/OtpPage/VerifyOtpPage";
import AdminLayout from "../layout/AdminLayout";
import UserRegistration from "../screens/user/UserRegistration";
import ProfilePage from "../screens/Profile/ProfilePage";
import CallAstrologer from "../components/messages/CallAstrologer";
import ChatAstrologer from "../components/messages/ChatAstrologer";
import ChatPage from "../screens/ChatPage/ChatPage";
// import Practisse from "../screens/pracrt";
const user = "user";

const PublicRoute = [
  {
    path: "/",
    element: user === "admin" ? <AdminLayout /> : <Layout />,

    children: [
      { path: "/", element: <Home /> },
      { path: "/VerifyOtpPage", element: <VerifyOtpPage /> },
      { path: "/UserRegistration", element: <UserRegistration /> },
      { path: "/ProfilePage", element: <ProfilePage /> },
      { path: "/Chatpage", element: <ChatPage /> },
      { path: "/ChatAstrologer", element: <ChatAstrologer /> },
      { path: "/CallAstrologer", element: <CallAstrologer /> },
    //  { path: "/Practisse", element: <Practisse /> },

    ],
  },
];

export default PublicRoute;
