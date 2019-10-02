import React from "react";
import { Container, Card, Form, Navbar, Button, NavbarBrand, Nav } from "react-bootstrap";

const Layout = props => {
  return (
    <Container>
      {/* <div className="Home-Container">
        <div className="Home-Content">
          <div className="signindiv">
            <Navbar className="nav-main">
              <Nav.Item>
                <h3>Jays'taGram </h3>
              </Nav.Item>
              <Nav.Item>
                <Button
                  variant=""
                  className="camera-btn"
                  onClick={() => this.handleNewPostClick()}
                >
                  <span className="logo" id="">
                    📸
                  </span>
                </Button>
              </Nav.Item>
              <Nav.Item>
                Welcome Back{" "}
                <span style={{ color: "blue" }}>{props.user}</span>
              </Nav.Item>
              <Nav.Item>
                <Button
                  variant="outline-dark"
                  onClick={() => this.props.history.push("/login")}
                  className="logout-btn"
                >
                  logout
                </Button>
              </Nav.Item>
              <Navbar.Toggle />
            </Navbar>
          </div>

          <div className="Home-main"></div> */}
          {props.children}
        {/* </div>
        <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div>
      </div> */}
    </Container>
  );
};

export default Layout;
