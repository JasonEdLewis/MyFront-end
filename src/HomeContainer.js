import React from "react";
import "./components/HomeContainer.css";
import Postcard from "./components/PostCard";
import NewPostCard from "./components/NewPostCard";

import Pic1 from "./img/allison-christine-8j-2d94Orlc-unsplash.jpg";
import Pic2 from "./img/amin-rokhide-3bmI5SLwfQM-unsplash.jpg";
import Pic3 from "./img/anita-austvika-J4pBYVlBxh4-unsplash.jpg";
import Pic4 from "./img/banter-snaps-BZzHWmQUszE-unsplash.jpg";
import Pic5 from "./img/brandon-hoogenboom-C6K0tIm6qvw-unsplash.jpg";
import Pic6 from "./img/brandon-hoogenboom-t_S_Qtf0GPc-unsplash.jpg";
import Pic7 from "./img/christiann-koepke-w_wDNUpq84E-unsplash.jpg";
import Pic8 from "./img/dmitrii-vaccinium-ByUAo3RpA6c-unsplash.jpg";
import Pic9 from "./img/eberhard-grossgasteiger-KVKYuYjKPnk-unsplash.jpg";
import Pic10 from "./img/fezbot2000-VILQd5PK--I-unsplash.jpg";
import Pic11 from "./img/houcine-ncib-lmVVTgPDD0U-unsplash.jpg";
import Pic12 from "./img/houcine-ncib-nY2Bcudehcc-unsplash.jpg";
import Pic13 from "./img/jack.png";
import Pic14 from "./img/jamshed-khedri-cHUrGGw2wU8-unsplash.jpg";
import Pic15 from "./img/jc-falcon-jvEENEKsM-I-unsplash.jpg";
import Pic16 from "./img/johan-de-jager-7Z2U9MPCKN0-unsplash.jpg";
import Pic17 from "./img/johan-de-jager-MoMIEEG_kHE-unsplash.jpg";
import Pic18 from "./img/jon-tyson-U1FLk5DykQs-unsplash.jpg";
import Pic19 from "./img/khanh-dang-z7odTZZ_gfg-unsplash.jpg";
import Pic20 from "./img/luke-jeremiah-6hXYSkEyEr8-unsplash.jpg";
import Pic21 from "./img/marcis-berzins-KyuvxYkR36Q-unsplash.jpg";
import Pic22 from "./img/markus-spiske-ur3wTilBmjQ-unsplash.jpg";
import Pic23 from "./img/maurits-bausenhart-QMRN_GX7p4I-unsplash.jpg";
import Pic24 from "./img/max-muselmann-5nH0Hh78Nh4-unsplash.jpg";
import Pic25 from "./img/mihaly-koles-q5479QVbdGo-unsplash.jpg";
import Pic26 from "./img/naitian-tony-wang-oafvLFMz9eE-unsplash.jpg";
import Pic27 from "./img/prescott-horn-8HnvsAd67qc-unsplash.jpg";
import Pic28 from "./img/prescott-horn-Xr2BYW5B8nQ-unsplash.jpg";
import Pic29 from "./img/randy-laybourne-NqSw3Y9RtmU-unsplash.jpg";
import Pic30 from "./img/randy-laybourne-h5MBEIV3t1s-unsplash.jpg";
import Pic31 from "./img/sara-kurfess-0LnSDQu5T5M-unsplash.jpg";
import Pic32 from "./img/spencer-gu-EI6sCmsJOS0-unsplash.jpg";
import Pic33 from "./img/the-joy-of-film-JayoUbXMppo-unsplash.jpg";
import Pic34 from "./img/the-joy-of-film-mmbRdjucSF8-unsplash.jpg";
import Pic35 from "./img/the-new-york-public-library-xXI1nmgPHVw-unsplash.jpg";
import Pic36 from "./img/the-nigmatic-pAGWDcyK9As-unsplash.jpg";
import Pic37 from "./img/william-navarro-ajMNJnxNo8k-unsplash.jpg";
import Pic38 from "./img/x-N4QTBfNQ8Nk-unsplash.jpg";
import Pic39 from "./img/yoav-hornung-yDuxvDzqn1k-unsplash.jpg";
import Pic40 from "./img/zip-house-design-HZDQCetoZtY-unsplash.jpg";

import { Card, Form, Navbar, Button, NavbarBrand, Nav } from "react-bootstrap";

class HomeContainer extends React.Component {
  state = {
    id: this.props.userId,
    name: this.props.user,
    comment: "",
    post_id: "",
    Picture: "",
    caption: "",
    likes: 0,
    page:"thePost"
    
  };

  info = () => {
    console.log(this.props);
    return this.props;
  };
  // POST COMMENT FETCH POST
  postComment = (id, content, fId) => {
    return fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        post_id: id,
        content: content,
        followee_id: fId
      })
    });
  };

  

  // HANDLER FOR COMMENTS
  handleComment = e => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  thePost = props => {
    

    return this.props.fposts.map(post => (
      <Postcard
        post={post}
        id={post.id}
        submitComment={() => this.submitComment(post.id, post.userId)}
        handleComment={this.handleComment}
      />
    ));
  };

  // SUBMIT THE COMMENT /FETCH POST
  handleNewPostClick = () => {
    this.setState({ newPost: !this.state.newPost });
  };

  theNewPostCard = props => {
    return (
      <NewPostCard
        handleNewPost={this.handleNewPost}
        submitPost={() => this.submitNewPost(this.state.id)}
        state={this.state}
        userId={this.state.id}

      />
    );
  };

  myProfile =() => {
    const myPost = this.props.fposts.filter(post => post.user_id === this.state.id);
    debugger
    return (
      <Postcard
        post={myPost}
        id={myPost.id}
        submitComment={() => this.submitComment(myPost.id, myPost.userId)}
        handleComment={this.handleComment}
        
      />
    );
  };
  // this.state.cameraClick ? NewPost() :

  submitComment = (postId, userId) => {
    console.log(
      "Post id",
      postId,
      "User is:",
      userId,
      "comment: ",
      this.state.comment
    );
    this.postComment(postId, this.state.comment, userId)
      .then(resp => resp.json())
      .then(console.log);
  };

  submitNewPost = id => {
    console.log(id);
    const postUlr = "http://localhost:3000/posts";
    console.log(
      "The state we are submitting",
      this.state.Picture,
      this.state.caption,
      id
    );
    fetch(postUlr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: id,
        Picture: this.state.Picture,
        caption: this.state.caption,
        likes: 0
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          newPost: false
        });
      });
    // this.handleNewPostClick();
  };

  handleNewPost = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  pageToRender=()=>{
    switch(this.state.page){
      case "thePost":
        return this.thePost()
      case "newPost":
        return this.theNewPostCard()
      case "profile":
        return this.myProfile()
    }
  }

  render() {
    // debugger
    console.log("Home Container state", this.state);
    const { fposts, user, userId } = this.props;

    return (
      <div className="Home-Container">
        <div className="Home-Content">
          <div className="signindiv">
            <Navbar className="ml-auto">
              <Nav.Item>
                <h3>Jays'taGram </h3>
              </Nav.Item>
              <Nav.Item>
                <Button
                  variant=""
                  className="camera-btn"
                  onClick={() => this.state.page({page:"newPost"})}
                >
                  <span className="logo" id={this.state.id}>
                    📸
                  </span>
                </Button>
              </Nav.Item>
              <Nav.Item>
                Welcome Back
                <span style={{ color: "blue" }} onClick={()=> this.setState({page:"profile"})}>{this.props.user}</span>
              </Nav.Item>
              <Nav.Item>
                <Button
                  variant="outline-dark"
                  onClick={() => this.props.history.push("/login")}
                  className="ml-auto"
                >
                  logout
                </Button>
              </Nav.Item>
              <Navbar.Toggle />
            </Navbar>
          </div>

          <div className="Home-main"></div>

          { 
            this.pageToRender()
            
          // this.state.newPost ? (
          //   <>
          //     <NewPostCard
          //       handleNewPost={this.handleNewPost}
          //       submitPost={() => this.submitNewPost(userId)}
          //       state={this.state}
          //       userId={userId}
          //     />
          //   </>)
          //  :
          //   this.thePost()
          
              
          }
        </div>
        <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div>
      </div>
    );
  }
}

export default HomeContainer;

/* if this.state.newPost? <NewPostCard> : (this.state.profile ? this.myPost : thisThePost())

// if (this.state.newPost){
  return (
    <>
              <NewPostCard
                handleNewPost={this.handleNewPost}
                submitPost={() => this.submitNewPost(userId)}
                state={this.state}
                userId={userId}
              />
            </>
     </>
  )
}
else if (this.state.profile){
this.myPost())
}
else {
  return this.myPost()
}


*/
