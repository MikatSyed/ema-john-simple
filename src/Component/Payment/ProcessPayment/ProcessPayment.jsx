import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './../SimpleCardForm/SimpleCardForm';
import SplitCardForm from '../SplitCardForm/SplitCardForm';



const stripePromise = loadStripe('pk_test_51Ie2AFBn3hNYqN6qt9KBf8hyGh9L8YwTH6kmWCIIhzQqwk2Q8nraDI8aFgy0oPIQKR8R64YAmqrhFFrbeYl4K1qa00qFHaCRwI');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment} ></SimpleCardForm>
            {/* <SplitCardForm handlePayment={handlePayment}></SplitCardForm> */}
        </Elements>
    );
};

export default ProcessPayment;