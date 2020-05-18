import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
        CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader,
        Row, Col, Label, Button } from 'reactstrap';
        import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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
            <div className="col-12 text-left">
                <h4 className="pb-3">Comments</h4>
                <ul className="list-unstyled">
                    {commentArray}
                </ul>
                <CommentForm />
            </div>
        );
    }
}

const DishDetail = (props) => {
    const dish = props.dish;
    let isModalOpen = false;
    let toggleModal = () => {};
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

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleModal();
    }

    validate(yourname, comment){
        const errors = {
            yourname: '',
            comment: ''
        };

        if (this.state.touched.yourname && yourname.length < 3)
            errors.yourname= 'Your Name should be >= 3 characters';
        else if (this.state.touched.yourname && yourname.length > 15)
            errors.yourname = 'Your Name should be <= 15 characters';

        if (this.state.touched.comment && comment.length < 3)
            errors.comment = 'Comment should be >= 3 characters';

        return errors;
        
    }

    render(){
        return(
            <div>
                <button type="button" className="btn btn-outline-secondary" onClick={this.toggleModal} ><i className="fa fa-pencil"></i> Submit Comment</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" xs={12}>Rating</Label>
                                <Col xs={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" xs={12}>Your Name</Label>
                                <Col xs={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                            />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" xs={12}>Comment</Label>
                                <Col xs={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters'
                                        }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col xs={12}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    };
}


export default DishDetail;