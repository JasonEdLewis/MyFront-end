import React from 'react'

export default function UserBio(props) {
    const {user, pic,bio,city,state, home} = props
        return (
        
        <div className="friends-and-suggested-headers">
        
          <> <h3 className="hi-im"><strong>Hi I'm {user}</strong></h3>
            <img src={pic} className="profile-pic" onClick={home}/>


            <div>
              <p className="bio"><strong>Bio:</strong> {bio}</p>
              <p><strong className="location">Location:</strong></p>
              <p className="city-state"><strong></strong> {city}, {state}</p>



            </div>
          </>
        </div>

    )
}
