import { useState, useEffect } from "react";
import "../../assets/styles/Auth/SignUp.scss";
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
import { postSignUp } from "../../services/apiServices";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

const SignUp = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = new useNavigate();

  useEffect(() => {
    const preventScroll = (event) => event.preventDefault();

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  const handleSignUp = async () => {
    //Validate
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!username) {
      toast.error("Invalid username");
      return;
    }

    if (!password || password.trim().length < 8) {
      toast.error("Password is minimum 8 characters");
      return;
    }

    setIsLoading(true);
    //APIs
    const data = await postSignUp(email, username, password);

    if (data && data.EC == 0) {
      toast.success("Welcome to XimenT!");
      setIsLoading(false);
      navigate(`/login`);
    }
    if (data && data.EC !== 0) {
      setIsLoading(false);
      toast.error("Email are ready exits!");
    }
  };

  const handleGoBack = () => {
    navigate(`/`);
  };

  const handleLogin = () => {
    navigate(`/login`);
  };

  return (
    <div className="signup-container container mx-auto">
      <div className="header">
        {/* <div className="logo">
              <img src={Logo} alt="logo" />
            </div> */}
        <div className="name">XimenT</div>
      </div>
      <div className="form-content col-4 mx-auto">
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-dark text-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "400px" }}
              >
                <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your email, password and username!
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
                    label="Username"
                    type="text"
                    size="lg"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
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
                  />

                  <div className="button-signup">
                    <button
                      disabled={isLoading}
                      className="btn btn-signup mb-3"
                      onClick={() => {
                        handleSignUp();
                      }}
                    >
                      {isLoading === true && <ImSpinner2 className="loader" />}
                      Sign up
                    </button>
                  </div>

                  <div>
                    <p className="mb-0">
                      You have an account?
                      <a
                        class="login"
                        onClick={() => {
                          handleLogin();
                        }}
                      >
                        Login
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

export default SignUp;
