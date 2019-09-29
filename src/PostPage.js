import React from 'react';
import NewPost from './components/NewPost'


export default class PostPage extends React.Component{

    state ={
        id : '',
        picture: '',
        caption: '',
        likes: 0,

    }

    handleChange=(e)=>{
this.setState({
    [e.target.name]: e.target.value})
    }

    render(){
        console.log(this.state)
            
        return(
            <NewPost handleChange={this.handleChange} state={this.state}/>
        )
    }
}