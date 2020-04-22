import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardTitle, CardText } from 'reactstrap';


class DishDetailComponent extends Component{
  constructor(props) {
    super(props);
  };
  renderDish(dish) {
    
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
  renderComments(comments){
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
  render(){
    const dish=this.props.dish;
    if (dish !=null){
      return(
        <div className="container"><div className="row">
        <div className="col-12 col-md-5 m-1">{this.renderDish(dish)}</div>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {this.renderComments(dish.comments)}
        </div>
      </div></div>
        
      )

    }
    else{
      return(
        <div> </div>
      );
    }

 }

}
export default DishDetailComponent;