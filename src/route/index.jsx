import React, { useState, useMemo } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import PublicRoute from "./publicRoute";
import UserRoute from "./userRoute";
import adminroute from "./admineRoute";
import astroRoute from "./astrologerRoute";

export default function ThemeRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("");
  const tk = localStorage.getItem("accessToken");

  useMemo(() => {
    const token = localStorage.getItem("accessToken");
    const userType = localStorage.getItem("userType");
    console.log("dfdfdff", token, userType);
    setIsAuthenticated(!!token);
    setUserType(userType || "");
  }, [tk]);


  console.log("isAuthenticated",isAuthenticated)
  let routes = [];
  if (isAuthenticated) {
    if (userType === "user") {
      routes = UserRoute;
    } else if (userType === "astrologer") {
      routes = astroRoute;
    } else if (userType === "admin") {
      routes = adminroute;
    }
  } else {
    routes = PublicRoute;
  }

  return useRoutes([
    ...routes,
    
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
