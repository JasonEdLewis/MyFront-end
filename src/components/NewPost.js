import React from "react";
import { Fragment, Label } from "react";
import { Form, FormControl, Button, Jumbotron } from "react-bootstrap";

const divStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "25%",

  width: "36rem",
  color: "black"
};
//  SET UP FETCH POST FOR NEW POST AND CREATE MIGRATTION FOR CAPTION FOR POST AND SET UP TO GO BACK THE HOME PAGE AFTER POST IS FINISHED POSTING

const NewPost = props => {
  // console.log(props);
  return (
    <Jumbotron>
      <>
        Upload Photo
        <Form.Control
          size="lg"
          type="text"
          placeholder="picture"
          value={props.state.picture}
          name="picture"
          onChange={props.handleChange}
        />
        <br />
        Caption
        <Form.Control
          type="text"
          placeholder="caption"
          name="caption"
          value={props.state.capiton}
          onChange={props.handleChange}
        />
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </>
    </Jumbotron>
  );
};
export default NewPost;
