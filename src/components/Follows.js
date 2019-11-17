import React, { Component} from 'react';
import { connect } from 'react-redux';
import { getFollows } from '../redux/actions/FollowActions'


 class Follows extends Component {

    componentDidMount() {
        this.props.getFollows()
        console.log("Hello from Follows")
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default connect(null, { getFollows })(Follows)