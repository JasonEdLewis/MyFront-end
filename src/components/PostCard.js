
import React from "react";
import { Card, Form } from "react-bootstrap";


const divStyle= {
 marginLeft: "32%",
 marginRight: 'auto',
  width: "18rem",
  color: "black"
  
}
const  PostCard =(props)=>{
 
  // debugger
  const {post} = props
  console.log("Card props: ", post.comments)
  
  const comment = ()=>{ 
    const text =  post.comments
    if (text.length > 0){
      return text.map(t=> t.content)
    } 
    else{
    return
    }
  }
return(
<Card style={divStyle} className="post-card" >
    <Card.Img
      variant="top"
      src={post.picture}
    />
    <Card.Body>
      <Card.Title>Cat Heaven</Card.Title>
      <Card.Text>
       {comment()}
      </Card.Text>
      <Form.Control size="sm" type="text" placeholder="Small text" />
    </Card.Body>
  </Card>
)
}

export default PostCard