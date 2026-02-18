import { useState } from "react";
import "../../assets/styles/Auth/Login.scss";
import Logo from "../../assets/img/logo.png";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../API/services/auth.service";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner2 } from "react-icons/im";
import Language from "../Header/Language";
const Login = (props) => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const navigate = new useNavigate();
  const dispatch = new useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    //APIS
    let data = await postLogin(email, password);
    if (data && data.EC == 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);

      navigate(`/`);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate(`/signup`);
  };

  const handleGoBack = () => {
    navigate(`/`);
  };

  const handleKeyDown = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container container mx-auto">
      <div className="header-login">
        {/* <div className="logo">
          <img src={Logo} alt="logo" />
        </div> */}
        <div className="name">XimenT</div>
        <div className="change-language ">
          <Language />
        </div>
      </div>
      <div className="form-content col-4 mx-auto">
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-dark text-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "400px" }}
              >
                <MDBCardBody className="p-4 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label="Email address"
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label="Password"
                    type="password"
                    size="lg"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    onKeyDown={(event) => {
                      handleKeyDown(event);
                    }}
                  />

                  <p className="small mb-3 pb-lg-2">
                    <a class="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  <div className="button-login">
                    <button
                      disabled={isLoading}
                      className="btn btn-login mb-3"
                      onClick={() => {
                        handleLogin();
                      }}
                    >
                      {isLoading === true && <ImSpinner2 className="loader" />}

                      <span>Login</span>
                    </button>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a
                        class="singup"
                        onClick={() => {
                          handleSignUp();
                        }}
                      >
                        Sign Up
                      </a>
                    </p>
                  </div>

                  <span
                    class="btn btn-goback"
                    onClick={() => {
                      handleGoBack();
                    }}
                  >
                    &#60;&#60; Go back!
                  </span>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Login;
