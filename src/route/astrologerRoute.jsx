import React from "react";
import AdminLayout from "../layout/AdminLayout";
import Dashboardone from "../screens/OtpPage/Dashboardone";
import { element } from "prop-types";
import UserProfile from "../screens/OtpPage/UserProfile";
import ChatPage from "../screens/ChatPage/ChatPage";
//import UserProfile from "../screens/OtpPage/UserProfile";
import EditAstrologer from "../screens/EditAstro/EditAstrologer";

import Callastroreport from "../screens/Callreport/callastroreport";
import Chatastroreport from "../screens/Callreport/chatastroreport";
import Paymentastroreport from "../screens/Callreport/paymentastroreport";
import Callpage from "../screens/Callpage/Callpage";
import Timeslot from "../screens/Timeslot/Timeslot";

const astroRoute = [

    {
        path:"/",
        element: <AdminLayout/>,
        children: [
           
            { path: "/", element: <Dashboardone /> },
            { path: "/Dashboardone", element: <Dashboardone /> },
            {path:"/UserProfile", element:<UserProfile/> },
            { path: "/Chatpage", element: <ChatPage />},
            { path: "/Callpage", element: <Callpage />},
            //{path:"/UserProfile", element:<UserProfile/> },
          {path:"/EditAstrologer",element:<EditAstrologer/>},

          { path: "/Callastroreport", element: <Callastroreport />},
          { path: "/Chatastroreport", element: <Chatastroreport />},
          { path: "/Paymentastroreport", element: <Paymentastroreport />},

          { path: "/Timeslot", element: <Timeslot />}

        ],
    },
];
export default astroRoute;