import React from "react";
import Layout from "../layout";
import Home from "../screens/home";
import ChatPage from "../screens/ChatPage/ChatPage";
import ProfilePage from "../screens/Profile/ProfilePage";
import Payment from "../screens/PaymentDetail/PaymentPage";
import SortBypape from "../screens/SortBy/SortByPape";
import CallAstrologer from "../components/messages/CallAstrologer";
import ChatAstrologer from "../components/messages/ChatAstrologer";
import FilterPage from "../screens/FilterPage/FilterPage";
import Add from "../screens/Add/Add";
import Callpage from "../screens/Callpage/Callpage";
import VerifyOtpPage from "../screens/OtpPage/VerifyOtpPage";
import UserProfile from "../screens/OtpPage/UserProfile";
import CallReports from "../screens/CallReports/CallReports";

const userRoute = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {  path: "/", element: <Home /> },
      { path: "/Chatpage", element: <ChatPage />},
      { path: "/FilterPage", element: <FilterPage /> },
      { path: "/ChatAstrologer", element: <ChatAstrologer /> },
      { path: "/CallAstrologer", element: <CallAstrologer /> },
      { path: "/SortBy", element: <SortBypape /> },
      { path: "/Payment", element: <Payment /> },
      { path: "/ProfilePage", element: <ProfilePage /> },
      { path: "/Add", element: <Add />},
      { path: "/Callpage", element: <Callpage />},
      { path: "/VerifyOtpPage", element: <VerifyOtpPage /> },
      { path: "/UserProfile", element: <UserProfile /> }, 
      { path: "/CallReport", element: <CallReports /> },
      

     



    ],
  },
];

export default userRoute;
