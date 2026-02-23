import AdSidebar from "./Sidebar";
import "../../assets/styles/Admin/Admin.scss";
import { Outlet } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import NavDropdown from "react-bootstrap/NavDropdown";

import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postLogOut } from "../../API/services/auth.service";
import { doLogOut } from "../../redux/action/userAction";
import { FaCircleUser } from "react-icons/fa6";

import Language from "../Header/Language";
import { useState } from "react";

import ModalUserInfor from "../User/ModalUserInfor";
const Admin = (props) => {
  const account = useSelector((state) => state.user.account);

  const [show, setShow] = useState(false);
  const [dataUser, setDataUser] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    let res = await postLogOut("account.email", account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogOut());
      navigate("");
      toast.success(res.EM);
    }
  };

  const handleUserInfor = () => {
    setShow(true);
    setDataUser(account);
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <AdSidebar />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <div className="search-bar ">
            <div className="form-floating ">
              <input
                className="form-control"
                id="floatingInput"
                placeholder="Search..."
              />
              <label for="floatingInput">Search...</label>
            </div>
          </div>
          <div className="left-content">
            <div className="theme-toggle">
              <IoSunny />
            </div>
            <div className="language-toggle">
              <Language />
            </div>
            <div className="admin-infor">
              <NavDropdown title={<FaCircleUser />} id="basic-nav-dropdown">
                <NavDropdown.Item>Tên: {account.username}</NavDropdown.Item>
                <NavDropdown.Item>Email: {account.email}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    handleUserInfor();
                  }}
                >
                  Trang cá nhân
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
      <ModalUserInfor show={show} setShow={setShow} dataUser={dataUser} />
    </div>
  );
};

export default Admin;
