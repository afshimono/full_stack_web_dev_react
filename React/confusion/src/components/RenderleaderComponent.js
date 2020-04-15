import React from 'react';
import { Media } from 'reactstrap';

function RenderLeader(props){
    const leader = props.leader
    return(
        <div key={leader.id} className="col-12 mt-5">
            <Media tag="li">
                <Media left middle>
                    <Media object src={leader.image} alt={leader.name} />
                </Media>
                <Media body className="ml-5">
                    <Media heading>{leader.designation}</Media>
                    <p>{leader.description}</p>
                </Media>
            </Media>
        </div>
    );
}

export default RenderLeader;