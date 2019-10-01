import React from "react";
import { Fragment, Label } from "react";
import { Form, FormControl, Button, Jumbotron, Card } from "react-bootstrap";

const divStyle = {
  margin: "auto",
  marginTop: "25%",
  width: "36rem",
  color: "black"
};
//  SET UP FETCH POST FOR NEW POST AND CREATE MIGRATTION FOR CAPTION FOR POST AND SET UP TO GO BACK THE HOME PAGE AFTER POST IS FINISHED POSTING

class NewPostCard extends React.Component{
  // console.log("NewPost Card props:",props);

  render(){
  const { handleNewPost, state,submitPost, userId } = this.props;
  return (
    <Fragment>
      Upload Photo
      <Card.Img variant="top" src={""} />
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text></Card.Text>
        <Form.Control
          size="sm"
          type="text"
          name="picture"
          placeholder="picture"
          style={divStyle}
          onChange={handleNewPost}
          value={state.picture}
        />
        <Form.Control
          size="sm"
          type="text"
          name="caption"
          placeholder="caption"
          style={divStyle}
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
};
export default NewPostCard;
