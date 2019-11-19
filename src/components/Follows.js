import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFollows } from '../redux/actions/FollowActions';


class Follows extends Component {

    componentDidMount() {
        const { getFollows} = this.props
        getFollows()

    }

    allFriends = () => {
        const friendships = []
        const { users, follows } = this.props
        follows.map(follow => {
            let Friend1 = users.find(user1 => {
                return user1.id === follow.followee_id
            });

            let Friend2 = users.find(user2 => {
                return user2.id === follow.follower_id
            });

            let pair = { [`${Friend1.username}`]: `${Friend2.username}` }

            friendships.push(pair)
            console.log("friendships:", friendships)
            return friendships

        })

        const areFreinds = (postuser, currentuser)=>{
            const { follows } = this.props
            const followid = follows.find(follow => follow.followee_id === postuser && follow.foller_id === currentuser ).id
        }

    }
    render() {

        return (
            <div>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        follows: state.follows,
        users: state.users.all
    }
}

export default connect(mapStateToProps, { getFollows })(Follows)