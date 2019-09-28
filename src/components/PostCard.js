
import React from "react";
import { Card, Form } from "react-bootstrap";


const divStyle= {
 marginLeft: "32%",
 marginRight: 'auto',
  width: "18rem"
  
}
const  PostCard =()=>{
  // const {post} = props
return(
<Card style={divStyle} className="post-card" >
    <Card.Img
      variant="top"
      src="https://www.xaprb.com/media/2018/08/kitten.jpg?thumbnail"
    />
    <Card.Body>
      <Card.Title>Cat Heaven</Card.Title>
      <Card.Text>
        <p>Some quick example text to build on the card title and make up
        the bulk of the card's content.</p>
      </Card.Text>
      <Form.Control size="sm" type="text" placeholder="Small text" />
    </Card.Body>
  </Card>
)
}

export default PostCard