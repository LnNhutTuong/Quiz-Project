import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";

import App from "./App";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import HomePage from "./components/Home/HomePage";
import Dashboard from "./components/Admin/Content/Dashboard";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import ListQuiz from "./components/User/ListQuiz";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="user" element={<ListQuiz />} />
        </Route>
        <Route path="admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-user" element={<ManageUser />} />
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </>
  );
};
export default Layout;
