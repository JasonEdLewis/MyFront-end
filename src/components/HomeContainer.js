import React from "react";
import "./HomeContainer.css";
import Postcard from './PostCard'
import { Card, Form, Navbar } from "react-bootstrap";

const HomeContainer = () => {
  return (
    <div className="Home-Container">
     
    <div className="Home-Content">
    <div className="signindiv">
        <Navbar className="login-nav">
          <Navbar.Brand href="#home">
            <h6 className="sign-in-header">Jays'taGram </h6>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">#UsersNameHere</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        </div>
      
      <div className="Home-main"> 
      
      </div>
        <h2>
            Put cards here!!
        </h2>

        {<Postcard/>}
        {/* <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere lorem ipsum dolor sit amet. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Ultricies leo integer malesuada nunc vel risus commodo viverra. Leo in vitae turpis massa sed elementum tempus egestas sed. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Egestas integer eget aliquet nibh praesent tristique magna. Enim praesent elementum facilisis leo. Ultricies leo integer malesuada nunc.
        </p> */}
        </div>
      <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div>
    </div>
  );
};

export default HomeContainer;
