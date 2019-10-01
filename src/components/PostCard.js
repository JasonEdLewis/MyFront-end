import React from "react";
import { Card, Form, Button, Col, Image, Container } from "react-bootstrap";
import Jack from "../img/jack.png";

const divStyle = {
  marginLeft: "32%",
  marginRight: "auto",
  width: "18rem",
  color: "black"
};
const spanStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "-15%",
  color: "pink",
  fontStyle: "italic",
  fontWeight: "bold",
  fontSize: "185%"
};
const thumbnailStyle = {
  height: "35px",
  marginRight: "15%",
  marginTop: "1%"
};
const ulStyle ={
listStyleType :"circle"
}

const PostCard = props => {
  const { post } = props;
  // console.log("Card props: ", props);

  const comment = () => {
    const text = post.comments;
    if (text.length > 0) {
      return text.map(t => {
        return <li style={ulStyle}>{t.content}</li>
      });
    } else {
      return;
    }
  };
  return (
    <Card style={divStyle} className="post-card" id={post.id}>
      <Image
        className="thumbnal"
        style={thumbnailStyle}
        src={require("../img/jack.png")}
      />
      <span style={spanStyle}>{post.user.username}</span>

      <Card.Img variant="top" src={Jack} />

      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
        <ul>{comment()}</ul></Card.Text>
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
