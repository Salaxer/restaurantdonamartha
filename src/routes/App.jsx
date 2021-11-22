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
import Restore from '../pages/Restore';
import EditProfile from '../pages/EditProfile';
import admin from '../pages/admin';
import NewProduct from '../pages/NewProduct';

import globalEvents from '../utils/globalEvents';

import '../assets/styles/general.css';
import '../assets/styles/header.css';

//Firebase
import {appdb, analytics} from '../db/conexiondb';
import {getAuth, onAuthStateChanged, onSnap } from "firebase/auth";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";

//React Redux
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import api from '../db/api';

const auth = getAuth();
const db = getFirestore();

const App = () => {

  //REDUX
  const dispatch = useDispatch()
  const {createUser, deleteUser, saveConection, deleteConection} = bindActionCreators(actionCreators, dispatch);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
        createUser(user);
        const conection = await api.getUserConection(user.uid);
        onSnapshot(doc(db, "Users", conection), (doc) => {
          saveConection([doc.data(), doc.id]);
        });
    } else {
        deleteUser();
        deleteConection();
    }
  });

  useEffect(()=>{
    globalEvents();
  },[])
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
          <Route exact path="/Profile/Edit" component={EditProfile} />
          <Route exact path="/Restore" component={Restore} />
          <Route exact path="/admin/:adminID" component={admin} />
          <Route exact path="/admin/:adminID/product" component={NewProduct} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};


export default App;
