
import React from "react";


post=(props)=>{
  const {post} =props
return(
<Card style={{ width: "18rem" }} className="post-card">
    <Card.Img
      variant="top"
      src="https://www.xaprb.com/media/2018/08/kitten.jpg?thumbnail"
    />
    <Card.Body>
      <Card.Title>Cat Heaven</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up
        the bulk of the card's content.
      </Card.Text>
      <Form.Control size="sm" type="text" placeholder="Small text" />
    </Card.Body>
  </Card>
)
}

export default PostCard