import React, {Component} from "react";
import { Navbar, Button, Card } from "react-bootstrap";
import PostCard from "./components/PostCard";
import { connect } from 'react-redux';


 class Profile extends Component {
  postCard = () => {
    return <PostCard />;
  };

  render() {
    const { user } = this.props;
    console.log("Profile page props:", this.props);
    return (
      <div>
        <div className="signindiv">
          <Navbar className="login-nav">
            <Navbar.Brand href="/home">
              <h1 className="sign-in-header">Jays'taGram </h1>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button
                  variant="outline-dark"
                  onClick={() => this.props.history.push("/login")}
                  className="logout-btn"
                >
                  logout
                </Button>
                Signed in as: <a href="#login">{user}</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          <Card style={{ width: "18rem" }} className="post-card">
            {/* {this.postCard()} */}
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return {
    post: state.post
  }
}
export default connect(mapStateToProps)(Profile)
{
  /* <Col xs={6} md={4}>
      <Image src="holder.js/171x180" roundedCircle />
    </Col> from https://react-bootstrap.github.io/components/images/ */
}
