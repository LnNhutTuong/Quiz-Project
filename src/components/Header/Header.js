import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const BasicExample = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          XimenT
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="Admin" className="nav-link ">
              Admin
            </NavLink>
            <NavLink to="User" className="nav-link ">
              User
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button
                  className="btn-login"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Login
                </button>
                <button
                  className=" btn-signup"
                  onClick={() => {
                    handleSignUp();
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>User infor</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BasicExample;
