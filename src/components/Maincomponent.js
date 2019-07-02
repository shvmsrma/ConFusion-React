import React, { Component } from 'react';
import Home from '../components/HomeComponent';
import Menu from './Menucomponent';
import Dishdetail from './Dishdetailcomponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { DISHES } from '../shared/dishes';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import {Switch,Route,Redirect} from 'react-router-dom';
import {COMMENTS} from  '../shared/comments';
import {LEADERS} from  '../shared/leaders';
import {PROMOTIONS} from  '../shared/promotions';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments:COMMENTS,
        leaders:LEADERS,
        promotions:PROMOTIONS,
        selectedDish: null
    };
  }



  render() {
      const HomePage = ()=>{
          return(
              <Home  dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
              />
          );
      }

      const DishWithId = ({match}) =>{
          return(
              <Dishdetail dish = {this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
              comments = {this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
          );

      }

    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component = {() => <Menu dishes={this.state.dishes } />} />
            <Route path = "/menu/:dishId" component = {DishWithId} />
            <Route exact path = "/contactus" component = {Contact} />
            <Route exact path = "/aboutus" component = {() => <About leaders = {this.state.leaders} /> } />
            <Redirect to = "/home" />
        </Switch>
        <Footer />
      </div>
      
    );
  }
}

export default Main;