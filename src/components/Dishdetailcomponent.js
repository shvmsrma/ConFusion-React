import React, { Component } from 'react';
import {
    Card, CardTitle, CardBody, CardImg, CardText, Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './loadingComponent'
import{baseUrl} from '../shared/baseUrl';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => !(val) || (val.length >= len)



class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    render() {
        return (
            <div>
                <Button onClick={this.toggleModal}><i className="fa fa-pencil"></i>Submit Comment </Button>


                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Form
                </ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <h6 md={2}>Rating</h6>

                            <Row className="form-group">
                                <Col>
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
                            <h6 md={2}>Your Name</h6>
                            <Row className="form-group">
                                <Col>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                                        className="form-control"
                                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be less than 10 characters'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <h6 md={2}>Comment</h6>
                            <Row className="form-group">
                                <Col>
                                    <Control.textarea model=".message" type="textarea" id="message" name="message" rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
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
    }
}
































function RenderDish({ dish }) {
    if (dish != null)
        return (
            <div className="col-12 col-md-5 md-1">
                <Card>
                    <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    else
        return (
            <div></div>
        );
}
function RenderComments({ comments, addComment, dishId }) {

    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul key={comments.id} className="list-unstyled">
                    {comments.map((comment, i) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    })}

                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );

    }
    else {
        return (
            <div></div>
        );
    }

}
const Dishdetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );

    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id} />
                </div>
            </div>

        );
    }
    else {
        return (
            <div></div>
        );
    }

}


export default Dishdetail;