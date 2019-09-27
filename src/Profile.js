import React from "react";
import { Navbar, Button, Card, Form } from "react-bootstrap";
import PostCard from './components/PostCard'

export default class Profile extends React.Component {

 postCard=()=>{
   return <PostCard/>
 }

  render() {
    return (
      <div>
        <div className="signindiv">
          <Navbar className="login-nav">
            <Navbar.Brand href="#home">
              <h1 className="sign-in-header">Jays'taGram </h1>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button
                  variant="outline-dark"
                  onClick={() => this.props.logout()}
                  className="logout-btn">
                  logout
                </Button>
                Signed in as: <a href="#login">#UsersNameHere</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          <Card style={{ width: "18rem" }} className="post-card">
           {this.postCard()}
        </div>
      </div>
    );
  }
}


 {/* <Col xs={6} md={4}>
      <Image src="holder.js/171x180" roundedCircle />
    </Col> from https://react-bootstrap.github.io/components/images/ */}