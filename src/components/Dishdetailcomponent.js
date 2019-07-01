import React from 'react';
import { Card, CardTitle, CardBody, CardImg, CardText } from 'reactstrap';



    
    function RenderDish({dish}) {
        if (dish != null)
            return (
                <div className="col-12 col-md-5 md-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
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
    function RenderComments({comments}) {

        if(comments != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul key={comments.id} className="list-unstyled">
                        {comments.map((comment,i) =>{
                            return(
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}

                    </ul>
                    </div>
            );

        }
        else{
            return(
                <div></div>
            );
        }
        
    }
    const Dishdetail = (props) => {

        if (props.dish != null){
            return (
                <div class="container">
                    <div className="row">
                        <RenderDish dish = {props.dish} />
                        <RenderComments comments = {props.dish.comments} />
                    </div>
                </div>
            );
            }
            else{
                return(
                    <div></div>
                );
            }
    
        }
        

export default Dishdetail;