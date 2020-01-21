import React, { Component } from 'react';
import { Row, Col, Card, Input, FormGroup, Label, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

    function RenderCampsite({campsite}) {
   return (
       <div className="col-md-5 m-1">
       <Card>
         <CardImg top src={campsite.image}/>
         <CardBody>
             <CardTitle>{campsite.name}</CardTitle>
             <CardText>{campsite.description}</CardText>
         </CardBody>
       </Card>
       </div>
   )
   }



   function RenderComments({comments}) { 
    if(comments){
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => (
                   <div key={comment.id}>
                       <p>{comment.text}</p>
                       <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p> 
                </div>
                ))}
                <CommentForm/>
            </div>
        )
    }
}


    function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            );
        }
        return <div />;
    }

    class CommentForm extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                isOpen: false
            }
            this.toggle = this.toggle.bind(this);
        }

        toggle(){
            this.setState({
                isOpen: !this.setState.isOpen,
            })
        }
        
        handleSubmit(values) {
            console.log('Current state is: ' + JSON.stringify(values));
            alert('Current state is: ' + JSON.stringify(values));
        }
        render(){
        return (
            <React.Fragment>
               <Button outline onClick={this.toggle}>
                   <i className="fa fa-pencil" /> 
               Submit Comment 
               </Button>

                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Submit comment</ModalHeader>
                <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                <div className="form-group">
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select defaultValue="1"
                    model=".rating" name="rating"
                    className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                    </div>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="author">Your Name</Label>
                        <Control.text
                        model=".author"
                        id="author"
                        name="author"
                        placeholder="Your Name"
                        className="form-control"
                        validators={{}}
                        />
                        <Errors
                        className="text-danger"
                        component="div"
                        model=".author"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be at least 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}
                        />
                        </Col>
                    </Row>
                    <div className="form-group">
                        <Label htmlFor="text">Comment</Label>
                        <Control.textarea
                        model=".text"
                        id="text"
                        name="text"
                        rows="6"
                        className="form-control"
                        />
                      <Errors
                        className="text-danger"
                        component="div"
                        model=".text"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be at least 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}
                        />
                    </div>
                    <Button type="submit" color="primary">Submit</Button>
                
                 </LocalForm>
             </ModalBody>
            </Modal>
            </React.Fragment>
        )
        }
    }

export default CampsiteInfo;
