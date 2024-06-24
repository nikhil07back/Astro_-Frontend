import React, { useState, useEffect } from "react";
import "../../css/sideBar.css";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineLanguage } from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { MdAddIcCall } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { MdMessage } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { CiChat1 } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import { BiSolidCustomize } from "react-icons/bi";
import { getGeneralSetting } from "../../API/GeneralSett/generalSetting";
import { MdAccessTime } from "react-icons/md";



export default function SideBar() {
  const navigate = useNavigate();
  const [siteName, setSiteName] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  function Logout() {
    localStorage.clear();
    navigate("/VerifyOtpPage");
  }

  const userType = localStorage.getItem("userType");

  const adminMenuItems = [
    {
      path: "/Dashboard",
      name: siteName + " Report",
      icon: <TbReportSearch />,
    },
    {
      path: "/AdminPage",
      name: "Add " + siteName,
      icon: <IoPersonAddSharp />,
    },
    {
      path: "/Language",
      name: "Add Language",
      icon: <MdOutlineLanguage />,
    },
    {
      path: "/AddExperties",
      name: "Add Expertise",
      icon: <GrUserExpert />,
    },
    {
      path: "/AstologerPrice",
      name: "Add " + siteName + " Price",
      icon: <GiTakeMyMoney />,
    },
    {
      path: "/generalSetting",
      name: "General Settings",
      icon: <MdOutlineSettings />,
    },
    {
      path: "/CustomField",
      name: "Custom Field",
      icon: <BiSolidCustomize />,
    },
    {
      path: "/logout",
      name: "Log Out",
      icon: <LuLogOut />,
      onClick: Logout,
    },
   
  ];

  const userMenuItems = [
    {
      path: "/Dashboardone",
      name: siteName + "Report",
      icon: <TbReportSearch />,
    },
    {
      path: "/callastroreport",
      name: "Call Report",
      icon: <MdAddIcCall />,
    },
    {
      path: "/chatastroreport",
      name: "Chat Report",
      icon: <CiChat1 />,
    },
    {
      path: "/paymentastroreport",
      name: "Payment Report",
      icon: <MdOutlinePayment />,
    },
    {
      path: "/chatpage",
      name: "Messages",
      icon: <MdMessage />,
    },
    {
      path: "/callpage",
      name: "Call",
      icon: <MdAddIcCall />,
    },
    {
      path: "Timeslot",
      name: "Time Table",
      icon: <MdAccessTime />,
    }
  ];

  const menuItem = userType === "admin" ? adminMenuItems : userMenuItems;

  useEffect(() => {
    gethtyuu();
  }, []);
  const gethtyuu = async () => {
    try {
      const response = await getGeneralSetting();
      console.log("responseSettingGEt", response.data?.data);
      setSiteName(response.data?.data[0].siteName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div style={{ width: isOpen ? "230px" : "50px" }} className="sidebar">
        <div className="top_section">
          <p style={{ display: isOpen ? "block" : "none" }} className="logo">
            Main menu
          </p>
          <div
            style={{ marginLeft: isOpen ? "30px" : "0px", marginTop: "-4%" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
            onClick={item.onClick}
            as="div"
            style={{ textDecoration: "none" }}
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
