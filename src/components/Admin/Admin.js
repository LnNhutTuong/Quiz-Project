import AdSidebar from "./Sidebar";
import "./Admin.scss";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <AdSidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <FaBars onClick={() => setCollapsed(!collapsed)} />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed, ducimus
        magnam similique distinctio eos quo numquam necessitatibus sint in,
        dicta fuga soluta tempore? Eveniet porro, nostrum est natus corporis
        dolorum!
      </div>
    </div>
  );
};

export default Admin;
