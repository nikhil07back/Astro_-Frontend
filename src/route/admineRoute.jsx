import React from "react";
import AdminPage from "../screens/Adminpage/Admin";
import Language from "../screens/language/Language";
import AddExperties from "../screens/addExpertise/addExpertise";
import AdminLayout from "../layout/AdminLayout";
import Dashboardone from "../screens/OtpPage/Dashboardone";
import AstologerPrice from "../screens/astrPrice/AstrologerPrice";
import GeneralSetting from "../screens/generalSettings/generalSetting";
import CustomField from "../screens/customField/cutomField";

const adminroute = [
  {
    path: "/",
    element: <AdminLayout />,

    children: [
      { path: "/", element: <Dashboardone /> },
      { path: "/Dashboard", element: <Dashboardone /> },
      { path: "/AdminPage", element: <AdminPage /> },
      { path: "/language", element: <Language /> },
      { path: "/AddExperties", element: <AddExperties /> },
      { path: "/AstologerPrice", element: <AstologerPrice /> },
      { path: "/generalSetting", element: <GeneralSetting /> },
      { path: "/CustomField", element: <CustomField /> },
    ],
  },
];

export default adminroute;
