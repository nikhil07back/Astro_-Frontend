import React, { useState } from "react";
import "../css/Layout.css";
import Header from "../screens/header";
import { Outlet } from "react-router-dom";
import SideBar from "../components/menuBar/sideBar";

const Layout = ({ children }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ marginBottom: "-1%", height: "16vh" }}>
        <Header />
      </div>
      <div>
        <div
          style={{
            marginTop: "2%",
            marginLeft: "2%",
            marginRight: "2%",
            overflowY: "auto",
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

export default Layout;
