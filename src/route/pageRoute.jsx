import React from "react";
import Layout from "../layout";
import Home from "../screens/home";
import ProfilePage from "../screens/Profile/ProfilePage";
// import Callpage from "../screens/startCallPage/Call";
import FrontPage from "../components/FrontPage";
import Footer from "../screens/Footer/Footer";
import AdminPage from "../screens/Adminpage/Admin";
import ChatPage from "../screens/ChatPage/ChatPage";
import Payment from "../screens/PaymentDetail/PaymentPage";

// import Add from "../screens/Add/addMoney";
import Add from "../screens/Add/Add";
import Callpage from "../screens/Callpage/Callpage";

// import Add from "../screens/Add/Add";
import Language from "../screens/language/Language";
import VerifyOtpPage from "../screens/OtpPage/VerifyOtpPage";
import AddExperties from "../screens/addExpertise/addExpertise";
import ChatAstrologer from "../components/messages/ChatAstrologer";
import FilterPage from "../screens/FilterPage/FilterPage";
import AdminLayout from "../layout/AdminLayout";
import UserProfile from "../screens/OtpPage/UserProfile";
import Dashboardone from "../screens/OtpPage/Dashboardone";
import SortBy from "../screens/SortBy/SortByPape";
import CallReport from "../screens/CallReports/CallReport";

import Callastroreport from "../screens/Callreport/callastroreport";
import Chatastroreport from "../screens/Callreport/chatastroreport";
import Paymentastroreport from "../screens/Callreport/paymentastroreport";

import Timeslot from "../screens/Timeslot/Timeslot";
import { element } from "prop-types";


const user = "user";
const Pagesroute = [
  {
    path: "/",
    element: user === "admin" ? <AdminLayout /> : <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/FrontPage", element: <FrontPage /> },
      { path: "/Footer", element: <Footer /> },
      { path: "/ProfilePage", element: <ProfilePage /> },
      { path: "/Chatpage", element: <ChatPage /> },
      { path: "/Payment", element: <Payment /> },
      { path: "/AdminPage", element: <AdminPage /> },
      { path: "/Add", element: <Add /> },
      { path: "/Callpage", element: <Callpage />},
     
      // {path: "/LoginPage", element:<LoginPage/>},
      // { path: "/AddLanguage", element: <AddLanguage /> },
      // { path: "/Addmoney", element: <Addmoney /> },
     
      { path: "/Language", element: <Language /> },
      { path: "/VerifyOtpPage", element: <VerifyOtpPage /> },
      { path: "/AddExperties", element: <AddExperties /> },
      { path: "/ChatAstrologer", element: <c /> },
      { path: "/FilterPage", element: <FilterPage /> },
      { path: "/Sortpage", element: <SortBy /> },
      { path: "/UserProfile", element: <UserProfile /> },
      { path: "/Dashboardone", element: <Dashboardone /> },
      { path: "/CallReport", element: <CallReport /> },

      { path: "/Callastroreport", element: <Callastroreport />},
      { path: "/Chatastroreport", element: <Chatastroreport />},
      { path: "/Paymentastroreport", element: <Paymentastroreport />},
      
      { path: "/Timeslot", element: <Timeslot />}

   
      // { path: "/OffcanvasExample", element: <OffcanvasExample /> },
    ],
  },
];
export default Pagesroute;
