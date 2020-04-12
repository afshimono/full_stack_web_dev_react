import React from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle} from 'reactstrap'

    function RenderDish({dish}){
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle><h4>{dish.name}</h4></CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments}){
        if(typeof comments === undefined){
            return(
                <div></div>
            );
        }
        else if(comments){
            const commentArray = comments.map((comment) => {
                const dateObj = new Date(Date.parse(comment.date));
                return(
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {dateObj.toLocaleString('default', { month: 'short' })} {dateObj.getDate()}, {dateObj.getFullYear()}</p>
                    </li>
                );
            });
            return(
                <div className="col-12 col-md-5 m-1 text-left">
                    <h4 className="pb-3">Comments</h4>
                    <ul className="list-unstyled">
                        {commentArray}
                    </ul>
                </div>
            );
        }
    }

    const DishDetail = (props) => {
        const dish = props.dish;
        if (dish)
            return(
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>    
                    </div>
                    <RenderComments comments={props.dish.comments}/>
                </div>
            );
        else
            return(
                <div className="row"></div>
            );
    }


export default DishDetail;