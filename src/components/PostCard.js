import React from "react";
import { Card, Form, Button, Col, Image, Container } from "react-bootstrap";
import Jack from "../img/jack.jpg";
import '../css/PostCard.css'



const PostCard = props => {

  const { post, user } = props;
  console.log("Post Card props: ", props);
  const comment = () => {

    const text = post.comments;
    if (text) {
      return text.map(t => {
        return <li className='li-style'>{t.content}</li>;
      });
    } else {
      return <h6 style={{ color: "light-grey" }}>Be the first to comment</h6>;
    }


  };
  const userNameOfPost = () => {
   return props.map(post => console.log(post))

  }
  return (
    <div className="post-card-div">
      <Card id={post.id} className="post-card">
        <Image
          className="post-thumbnail"
          src={require("../img/jack.jpg")}
        /> <button id="add-friend">friend</button>

        <span className="span-style">{post.user.username}</span>

        <Card.Img className="img-box" src={require('../img/pic_placeholder.png')} />

        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            <h5 className="caption">User: {post.caption}</h5>
            <ul className='ulStyle'>{comment()}</ul>
          </Card.Text>
          <Form.Control
            size="sm"
            type="text"
            name="comment"
            value={props.comment}
            onChange={props.handleComment}
            placeholder="comment"
          />
        </Card.Body>
        <Button variant="link" onClick={props.submitComment}>
          Post
      </Button>
      </Card>
    </div>
  );
};

export default PostCard;


// const divStyle = {
//   marginLeft: "32%",
//   marginRight: "auto",
//   width: "18rem",
//   color: "black"
// };
// const cardStyle = {
//   width: "450px",
//   hieght: "250px",
//   marginLeft: "auto",
//   marginRight: "auto",
//   border: "1px",
//   borderStyle: "dashed",
//   borderColor: "pink",
//   backgroundColor: "#fff"
// };
// const spanStyle = {
//   marginLeft: "auto",
//   marginRight: "auto",
//   marginTop: "0%",
//   color: "pink",
//   fontStyle: "italic",
//   fontWeight: "bold",
//   fontSize: "185%"
// };
// const thumbnailStyle = {
//   height: "50px",
//   marginRight: "5%",
//   marginTop: "3%"
// };
// const ulStyle = {
//   listStyleType: "square",
//   color: "black"
// };