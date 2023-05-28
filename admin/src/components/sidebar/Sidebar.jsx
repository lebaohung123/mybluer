import { PermIdentity } from "@material-ui/icons";
import ReceiptIcon from "@material-ui/icons/Receipt";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { AdbOutlined } from "@material-ui/icons";
import { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={`sidebarListItem ${
                  activeItem === "home" ? "active" : ""
                }`}
                onClick={() => handleItemClick("home")}
              >
                <HomeIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li
                className={`sidebarListItem ${
                  activeItem === "users" ? "active" : ""
                }`}
                onClick={() => handleItemClick("users")}
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/posts" className="link">
              <li
                className={`sidebarListItem ${
                  activeItem === "posts" ? "active" : ""
                }`}
                onClick={() => handleItemClick("posts")}
              >
                <ReceiptIcon className="sidebarIcon" />
                Posts
              </li>
            </Link>
            <Link to="/advertisiment" className="link">
              <li
                className={`sidebarListItem ${
                  activeItem === "advertisement" ? "active" : ""
                }`}
                onClick={() => handleItemClick("advertisement")}
              >
                <EqualizerIcon className="sidebarIcon" />
                Advertisements
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
