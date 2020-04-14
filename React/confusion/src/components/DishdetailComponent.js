import React from 'react';
import { Card, CardImg, CardText, CardBody,
        CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>
        );
        else
            return(
                <div className="row"></div>
            );
    }


export default DishDetail;