import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";

import App from "./App";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import HomePage from "./components/Home/HomePage";
import Dashboard from "./components/Admin/Content/Dashboard";
import ManageUser from "./components/Admin/Content/ManageUser";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import ListQuiz from "./components/User/Quiz/ListQuiz";
import DetailQuiz from "./components/User/Quiz/DetailQuiz";
import ManageQuestion from "./components/Admin/Content/Question/ManageQuestion";

const NotFound = () => {
  return <div className="container mt-5 alert alert-danger">404 Not Foud</div>;
};

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="user" element={<ListQuiz />} />
        </Route>
        <Route path="quiz/:id" element={<DetailQuiz />} />
        <Route path="admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
          <Route path="manage-question" element={<ManageQuestion />} />
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="*" element={<NotFound />}></Route>
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
