import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
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
import Admin from '../pages/admin';
import NewProduct from '../pages/NewProduct';
import NewOffer from '../pages/NewOffer';
import Offer from '../pages/Offers';

import globalEvents from '../utils/globalEvents';

import '../assets/styles/general.css';
import '../assets/styles/header.css';

//Firebase
import {getAuth, onAuthStateChanged } from "firebase/auth";
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
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/menu" element={<Menu/>} />
          <Route exact path="/menu/:FoodId" element={<Information/>} />
          <Route exact path="/checkout/payment" element={<Payment/>} />
          <Route exact path="/checkout/success" element={<Success/>}/>
          <Route exact path="/Signup" element={<Signup/>} />
          <Route exact path="/Signin" element={<Signin/>} />
          <Route exact path="/Profile" element={<Profile/>} />
          <Route exact path="/Profile/Edit" element={<EditProfile/>} />
          <Route exact path="/Restore" element={<Restore/>} />
          <Route exact path="/admin/:adminID" element={<Admin/>} />
          <Route exact path="/admin/:adminID/product" element={<NewProduct/>} />
          <Route exact path="/admin/:adminID/offer" element={<NewOffer/>} />
          <Route exact path="/offers/:offerID" element={<Offer/>} />
          <Route element={<NotFound/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};


export default App;
