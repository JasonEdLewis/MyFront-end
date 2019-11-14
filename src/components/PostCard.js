import React from "react";
import { Card, Form, Button, Col, Image, Container } from "react-bootstrap";
import Jack from "../img/jack.jpg";

const divStyle = {
  marginLeft: "32%",
  marginRight: "auto",
  width: "18rem",
  color: "black"
};
const cardStyle = {
  width: "450px",
  hieght: "250px",
  marginLeft: "auto",
  marginRight: "auto",
  border: "1px",
  borderStyle: "dashed",
  borderColor: "pink",
  backgroundColor: "#fff"
};
const spanStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "0%",
  color: "pink",
  fontStyle: "italic",
  fontWeight: "bold",
  fontSize: "185%"
};
const thumbnailStyle = {
  height: "50px",
  marginRight: "5%",
  marginTop: "3%"
};
const ulStyle = {
  listStyleType: "square",
  color: "black"
};

const PostCard = props => {

  const { post, user } = props;
  // console.log("Card props: ", props);



  const comment = () => {

    const text = post.comments;
    if (text) {
      return text.map(t => {
        return <li style={ulStyle}>{t.content}</li>;
      });
    } else {
      return <h6 style={{ color: "light-grey" }}>Be the first to comment</h6>;
    }
  };
  return (

    <Card style={cardStyle} className="post-card" id={post.id}>
     
      <Image
        className="thumbnal"
        style={thumbnailStyle}
        src={require("../img/jack.jpg")}
      /> <button id="add-friend">Add</button>
      <h5>{post.caption}</h5>
      <span style={spanStyle}>{post.username}</span>

      <Card.Img variant="top" src={require('../img/pic_placeholder.png')} />

      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          <ul>{comment()}</ul>
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

  );
};

export default PostCard;
