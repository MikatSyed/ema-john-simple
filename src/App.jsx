import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import {
  Switch,
  Route
} from "react-router-dom";
import Review from './Component/Review/Review';
import Invertory from './Component/Inventory/Invertory';
import Error from './Component/Error/Error';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Shipment from './Component/Shipment/Shipment';
import Login from './Component/Login/Login';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import ProcessPayment from './Component/Payment/ProcessPayment/ProcessPayment';


export const UserContext = createContext();
function App() {
   const[loggedInUser,setLoggedInUser] = useState({})
   console.log(loggedInUser);
   
  return (
   
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}> 
     
  
     <Header />
      <Switch>
   
        <Route exact path="/" component={Shop} />
        <Route path="/process" component={ProcessPayment} />
        <Route path="/shop" component={Shop} />
        <Route path="/review" component={Review} />
        <PrivateRoute path="/manage" component={Invertory} />
        <Route path="/product/:productKey" component={ProductDetails} />
        <PrivateRoute  path="/shipment"  component={Shipment}/>
        <Route path="/login" component={Login} />
        <Route  component={Error} />

      </Switch>
    </UserContext.Provider>
  );
}


export default App;
