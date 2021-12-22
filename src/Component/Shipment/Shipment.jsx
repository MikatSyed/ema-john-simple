import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { UserContext } from './../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from './../Payment/ProcessPayment/ProcessPayment';


const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData,setShippingData] = useState(null)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
   setShippingData(data)
  }
  const handlePaymentMethod = paymentId => {
    const savedCart = getDatabaseCart()
  
    const orderDetails = { ...loggedInUser, products: savedCart, shipment:shippingData ,paymentId: paymentId, orderTime: new Date() };

    fetch('http://localhost:6700/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(response => response.json())
      .then(data => {

        processOrder()
        // alert('Order added successfully');

      })
  }

  console.log(watch("example"));
  return (
    <div className="row">

      <div style={{display: shippingData ? 'none': 'block'}}className="col-md-6" >
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue={loggedInUser.name}{...register("name", { required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">Name is required</span>}

          <input defaultValue={loggedInUser.email}{...register("email", { required: true })} placeholder="Your Email" />
          {errors.email && <span className="error">Email is required</span>}

          <input {...register("address", { required: true })} placeholder="Your Address" />
          {errors.address && <span className="error">Address is required</span>}

          <input {...register("phone", { required: true })} placeholder="Your Phone Number" />
          {errors.phone && <span className="error">Phone is required</span>}

          <input type="submit" />
        </form>
      </div>

      <div  style={{display: shippingData ? 'block': 'none'}} className="col-md-6">
      <h3>Pay Here</h3>
        <ProcessPayment handlePayment={handlePaymentMethod}/>
      </div>

    </div>
  );
};

export default Shipment;