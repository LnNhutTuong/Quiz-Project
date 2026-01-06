import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import bgSidebar from "../../assets/img/bg-sidebar1.png";
const AdSidebar = (props) => {
  const { collapsed, toggled } = props;
  return (
    <>
      <Sidebar collapsed={collapsed} toggled={toggled} image={bgSidebar}>
        <div className="sidebar-header">
          <div className="icon"></div>
          <div className="name">XimenT</div>
        </div>
        <hr />
        <div className="sidebar-body">
          <Menu>
            <MenuItem>Dashboard</MenuItem>
            <SubMenu label="Features">
              <MenuItem> Manager User</MenuItem>
              <MenuItem> Manager Quiz</MenuItem>
              <MenuItem> Manager Questions</MenuItem>
            </SubMenu>
          </Menu>
        </div>
        <div className="sidebar-footer">
          <hr />
          SKIBIDI TOILET
        </div>
      </Sidebar>
    </>
  );
};

export default AdSidebar;
