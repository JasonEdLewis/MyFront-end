import React from "react";
import "./HomeContainer.css";
import Postcard from './PostCard'
import { Card, Form, Navbar } from "react-bootstrap";



const HomeContainer = (props) => {

  const thePost = props.posts.map(post => <Postcard post={post} id={post.id} comments={post.comments} key={post.id}/>)
  
  // console.log("Home Container Props:", props.posts)
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

        {thePost}
        
        </div>
      <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div>
    </div>
  );
};

export default HomeContainer;
