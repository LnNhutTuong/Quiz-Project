import AdSidebar from "./Sidebar";
import "../../assets/styles/Admin/Admin.scss";
import { Outlet } from "react-router-dom";

const Admin = (props) => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <AdSidebar />
      </div>
      <div className="admin-content">
        <div className="admin-header"></div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
