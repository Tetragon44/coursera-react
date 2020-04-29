import React, { Component } from 'react';
import logo from '../logo.svg';
import{ Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import DishDetailComponent from './DishdetailComponent';
import { DISHES } from '../shared/dishes';


class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      dishes: DISHES,
      selectedDish: null
    };
    
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
}
  render(){
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/"> Ristorante Con Fusion </NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes}
        onClick={(dishId) => this.onDishSelect(dishId)}>
  
        </Menu>
        <DishDetailComponent dish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]}/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
    
  
  
}

export default Main;
