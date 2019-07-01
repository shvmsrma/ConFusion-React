import React, { Component } from 'react';
import Home from '../components/HomeComponent';
import Menu from './Menucomponent';
import Dishdetail from './Dishdetailcomponent';
import { DISHES } from '../shared/dishes';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
    };
  }



  render() {
      const HomePage = ()=>{
          return(
              <Home />
          );
      }
    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component = {() => <Menu dishes={this.state.dishes } />} />
            <Redirect to = "/home" />
        </Switch>
        <Footer />
      </div>
      
    );
  }
}

export default Main;