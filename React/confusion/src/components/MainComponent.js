import React, { Component } from 'react';
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes'
import DishDetail from './DishdetailComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';



class Main  extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
        }  
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
    }

  render(){
    const HomePage = () => {
        return(
            <Home 
            />
        );
      }
  
    return (
        <div className="App">
        <Header />
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        <Footer />
        </div>
    );
  }
}

export default Main;
