import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import bgSidebar from "../../assets/img/bg-sidebar1.png";
import logo from "../../assets/img/logo.png";
import { MdDashboard } from "react-icons/md";
import { MdFeaturedPlayList } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const AdSidebar = (props) => {
  const { collapsed, toggled } = props;

  const navigate = new useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <Sidebar collapsed={collapsed} toggled={toggled} image={bgSidebar}>
        <div className="sidebar-header" onClick={() => handleClick()}>
          <div className="icon">
            <img src={logo} alt="logo" />
          </div>
          <div className="name">XimenT</div>
        </div>
        <hr />
        <div className="sidebar-body">
          <Menu>
            <MenuItem icon={<MdDashboard />} component={<Link to="/admin" />}>
              Dashboard
            </MenuItem>
            <SubMenu label="Features" icon={<MdFeaturedPlayList />}>
              <MenuItem component={<Link to="manage-user" />}>
                Manager User
              </MenuItem>
              <MenuItem component={<Link to="manage-quiz" />}>
                {" "}
                Manager Quiz
              </MenuItem>
              <MenuItem> Manager Questions</MenuItem>
            </SubMenu>
          </Menu>
        </div>

        <div className="sidebar-footer">
          <hr />
          <div className="banchan">
            <div className="long-name">&#169; XimenT</div>
            <div className="short-name">&#169; XT </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default AdSidebar;
