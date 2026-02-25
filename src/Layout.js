import { Route, Routes } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";

import App from "./App";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import HomePage from "./components/Home/HomePage";
import Dashboard from "./components/Admin/Content/Dashboard";
import ManageUser from "./components/Admin/Content/ManageUser";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
// import ListQuiz from "./components/User/Quiz/ListQuiz";
import MainDetailQuiz from "./components/User/Quiz/DetaiQuiz/MainDetailQuiz";
import ManageQuestion from "./components/Admin/Content/Question/ManageQuestion";
import PrivateRoute from "./Routes/PrivateRoute";
import { Suspense } from "react";
const NotFound = () => {
  return <div className="container mt-5 alert alert-danger">404 Not Foud</div>;
};

const Layout = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="quiz/:id" element={<MainDetailQuiz />} />
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
          <Route path="manage-question" element={<ManageQuestion />} />
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="test" element={<PrivateRoute />}></Route>
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
    </Suspense>
  );
};
export default Layout;
