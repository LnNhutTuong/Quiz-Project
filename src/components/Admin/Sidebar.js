import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import bgSidebar from "../../assets/img/bg-sidebar1.png";
import logo from "../../assets/img/logo.png";
import { MdDashboard } from "react-icons/md";
import { MdFeaturedPlayList } from "react-icons/md";

const AdSidebar = (props) => {
  const { collapsed, toggled } = props;
  return (
    <>
      <Sidebar collapsed={collapsed} toggled={toggled} image={bgSidebar}>
        <div className="sidebar-header">
          <div className="icon">
            <img src={logo} alt="logo" />
          </div>
          <div className="name">XimenT</div>
        </div>
        <hr />
        <div className="sidebar-body">
          <Menu>
            <MenuItem icon={<MdDashboard />}>Dashboard</MenuItem>
            <SubMenu label="Features" icon={<MdFeaturedPlayList />}>
              <MenuItem> Manager User</MenuItem>
              <MenuItem> Manager Quiz</MenuItem>
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
