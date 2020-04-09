import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle} from 'reactstrap'

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {   
            
        }         
    }

    renderDish(dish){
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

    renderComments(comments){
        if(comments.length === 0){
            return(
                <div></div>
            );
        }
        else{
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

    render(){
        const dish = this.props.dish;
        if (dish != null)
            return(
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}    
                    </div>
                    {this.renderComments(dish.comments)}
                </div>
            );
        else
            return(
                <div></div>
            );
    }
}

export default DishDetail;