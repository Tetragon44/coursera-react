import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom';


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
function RenderComments({comments}){
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
    <ul>{commentList}</ul>
  );

};
const DishDetailComponent = (props)=> {
    
    const dish=props.dish;
    if (dish !=null){
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
            <RenderComments comments={props.comments} />
            
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