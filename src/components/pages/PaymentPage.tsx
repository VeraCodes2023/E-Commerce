import React from 'react';
import CheckoutForm from './CheckoutForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51NzDu3A1mH33T284MDtzaydeCtgYaBm1iaNFxeATC3sXW18D1bTDfhjRM74DJ37DvaJAuwIbKxYjW74BWpeWU6sv007Xhstysq'

);

const PaymentPage:React.FC = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret:process.env.SECRET
  };
  console.log(options)
  return (
    <Elements stripe={stripePromise} options={options}>
      {/* <CheckoutForm /> */}
    </Elements>
  )
}
export default PaymentPage;