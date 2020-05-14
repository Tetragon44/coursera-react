import React, { Component } from 'react';
import { Card,Col, CardImg, CardBody,Row,Button,Label,Modal, ModalBody, ModalHeader, CardTitle, CardText, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) &&(val.length>=len);


class CommentForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      
      isModalOpen: false
    };
    
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }
  
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }
    render(){
      return(
        <div className="container">
          <div className="row">
            <Button outline onClick={this.toggleModal}>
                          <span className="fa fa-pencil">
                              Submit Comment
                          </span>
            </Button>
            
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                  <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                    <Row className="form-group">
                      <Label for="name" md={2}>Name</Label>
                        <Col md={10}>
                          <Control.text model=".author" id="author" name="author" 
                              placeholder="Name" 
                              className="form-control"
                              validators={{required,minLength: minLength(3),maxLength:maxLength(15)}}/>
                          <Errors className="text-danger" model=".author" show="touched"
                              messages={{
                                required: 'Required',
                                minLength: 'Must be >2',
                                maxLength: 'Must be <15'
                              }}/>
                        </Col>
                    </Row>
                    
                    <Row check>
                      <Label for="rating" md={2}>Rating</Label>
                      <Col md={10}>
                        <Control.select model=".rating" name="rating" className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>

                        </Control.select>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="comment" md={2}>Comment</Label>
                      <Col md={10}>
                        <Control.textarea model=".comment" id="comment" name="comment" 
                            rows="12" className="form-control"validators={{required}}/>
                            <Errors className="text-danger" model=".comment" show="touched"
                              messages={{
                                required: 'Required',
                                
                              }}/>
                      </Col>
                   </Row>
                    <Row className="form-group">
                      <Col md={{size:10, offset:2}}>
                        <Button type="submit" color="primary">Send Feedback</Button>
                      </Col>
                    </Row>
                  </LocalForm>
                </ModalBody>
            </Modal>
          </div>
        </div>
      )
    }
  }


function RenderDish({dish}) {
    
  return(
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description} <p>Price {dish.price} $</p></CardText>
      </CardBody>
    </Card>
 
  );
};
function RenderComments({comments, addComment, dishId}){
  const commentList = comments.map((comment) =>
<>
    <li className="list-unstyled">{comment.comment}</li>
    <li className="list-unstyled">
    <p>-- {comment.author}, {new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                      }).format(new Date(comment.date))}</p></li>
    <br></br>
</>
  );
  return (
    <ul>{commentList}

    <CommentForm dishId={dishId} addComment={addComment}/></ul>
  );

};
const DishDetailComponent = (props)=> {
  if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        
    
    
        else if (props.dish !=null){
          return(
            <div className="container">
                <div className="row">
                  <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                  </div>
                </div>
              <div className="row">
              <div className="col-12 col-md-5 m-1"><RenderDish dish={props.dish} /></div>
              <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <RenderComments comments={props.comments}
                  addComment={props.addComment} dishId={props.dish.id}/>
                
              </div>
              </div>
            </div>
            
          )

        }
        else{
          return(
            <div> </div>
          );
        }

 

}
export default DishDetailComponent;