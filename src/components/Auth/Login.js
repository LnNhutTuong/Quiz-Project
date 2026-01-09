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
const Login = (props) => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const handleLogin = () => {
    alert(`oks`);
  };
  return (
    <div className="login-container container mx-auto">
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
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                  />

                  <p className="small mb-3 pb-lg-2">
                    <a class="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  <div>
                    <button className="btn-login mb-3">Login</button>
                  </div>
                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a href="#!" class="text-white-50 fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
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
