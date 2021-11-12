import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import menu from '../pages/Menu';
import Information from '../pages/Information';
import Payment from '../pages/Payment';
import Success from '../pages/Success';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Profile from '../pages/Profile';

import globalEvents from '../utils/globalEvents';

import '../assets/styles/general.css';
import '../assets/styles/header.css';

//Firebase
import {appdb, analytics} from '../initializers/conexiondb';
import {getAuth, onAuthStateChanged } from "firebase/auth";

//React Redux
import { saveUser } from '../initializers/actions';
import { connect } from 'react-redux';

const auth = getAuth();

const App = () => {
  useEffect(()=>{
    globalEvents();
    onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log(user);
          saveUser(user)
      } else {
          // User is signed out
          // ...
          console.log(user);
          console.log('Adios ');
      }
    });
  })
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/menu" component={menu} />
          <Route exact path="/menu/:FoodId" component={Information} />
          <Route exact path="/checkout/payment" component={Payment} />
          <Route exact path="/checkout/success" component={Success} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Signin" component={Signin} />
          <Route exact path="/Profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  saveUser
}

export default connect(null, mapDispatchToProps)(App);
