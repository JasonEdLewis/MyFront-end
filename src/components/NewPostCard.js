import React from "react";
import { Fragment, Label } from "react";
import { Form, FormControl, Button, Jumbotron, Card, Image } from "react-bootstrap";

const formStyle = {
  margin: "auto",
  marginTop: "15%",
  width: "24rem",
  color: "black"
};
const thumbnailStyle = {
  height: "250px",
  marginRight: "auto",
  marginLeft: "auto",
  marginTop: "1%"
};

const cardStyle = {
  width: "600px",
  hieght: "auto",
  marginLeft: "auto",
  marginRight: "auto",
  border: "1px",
  borderStyle: "dashed",
  borderColor: "pink",
  backgroundColor: "#fff"
};
//  SET UP FETCH POST FOR NEW POST AND CREATE MIGRATTION FOR CAPTION FOR POST AND SET UP TO GO BACK THE HOME PAGE AFTER POST IS FINISHED POSTING

class NewPostCard extends React.Component {
  // console.log("NewPost Card props:",props);

  render() {
    const { handleNewPost, state, submitPost, userId } = this.props;
    return (
      <Fragment>
        
        <Card.Img variant="top" src={""} />
        <Card.Body style={cardStyle}>
          <Card.Title style={{ color:"red"}}>New Post</Card.Title>
          <Card.Text></Card.Text>
          <Image
        className="thumbnal"
        style={thumbnailStyle}
        src={require("../img/jack.png")}
      />
          <Form.Control
            size="sm"
            type="text"
            name="picture"
            placeholder="picture"
            style={formStyle}
            onChange={handleNewPost}
            value={state.picture}
          />
          <Form.Control
            size="sm"
            type="text"
            name="caption"
            placeholder="caption"
            style={formStyle}
            onChange={handleNewPost}
            value={state.caption}
          />
          <Button variant="Info" onClick={() => submitPost(userId)}>
            Post
          </Button>
        </Card.Body>
      </Fragment>
    );
  }
}
export default NewPostCard;
