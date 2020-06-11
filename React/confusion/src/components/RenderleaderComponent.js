import React from 'react';
import { Fade } from 'react-animation-components';
import { Media } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

function RenderLeader(props) {
    const leader = props.leader;
    return (
        <div key={leader.id} className="col-12 mt-5">
            <Fade in>
                <Media tag="li">
                    <Media left middle>
                        <Media object src={baseUrl + leader.image} alt={leader.name} />
                    </Media>
                    <Media body className="ml-5">
                        <Media heading>{leader.designation}</Media>
                        <p>{leader.description}</p>
                    </Media>
                </Media>
            </Fade>
        </div>
    );
}

export default RenderLeader;
