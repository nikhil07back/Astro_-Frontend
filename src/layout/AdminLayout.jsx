import React, { useState } from "react";
import "../css/Layout.css";
import { Outlet } from "react-router-dom";
import SideBar from "../components/menuBar/sideBar";
import AdminHeader from "../screens/header/AdminHeader";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{  height: "14%", zIndex: 2 }}>
        <AdminHeader />
      </div>
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <SideBar />
        <div
          style={{
            marginTop: "2%",
            marginLeft: "2%",
            marginRight: "2%",
            overflowY: "auto",
            width: "100%",
          }}
        >
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
