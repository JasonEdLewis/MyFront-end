
import React from "react";
import { Card, Form,Button } from "react-bootstrap";



const divStyle= {
 marginLeft: "32%",
 marginRight: 'auto',
  width: "18rem",
  color: "black"
  
}
const  PostCard =(props)=>{
 
  const {post} = props
  // console.log("Card props: ", props)
  
  const comment = ()=>{ 
    const text =  post.comments
    if (text.length > 0){
      return text.map(t=> {
       return( t.content )
      }
        )
    } 
    else{
    return
    }
  }
return(
<Card style={divStyle} className="post-card" id={post.id} >
    <Card.Img
      variant="top"
      src={require('../img/allison-christine-8j-2d94Orlc-unsplash.jpg')}
    />
    <Card.Body>
      <Card.Title></Card.Title>
      <Card.Text>
       {comment()}
      </Card.Text>
      <Form.Control size="sm" type="text" name="comment" value={props.comment} onChange={props.handleComment} onEnter={props.submitComment(post.id)} placeholder="comment" />
      <Button variant="link">Post</Button>
    </Card.Body>
  </Card>
)
}

export default PostCard