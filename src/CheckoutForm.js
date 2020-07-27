import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  // When the confirm payment button is clicked...
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    // Get the client secret key and pass it back via json
    const response = await fetch('/secret');
    const {client_secret: clientSecret} = await response.json();

    // Call stripe.confirmCardPayment() with the client secret
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
          // Note the instruction from step 4: Pass additional billing details, such as the cardholder name and address, to the billing_details hash.
        },
      }
    
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      alert("Sorry, insufficient funds. Please come back when you've saved more pennies.")
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        alert("You have won the Internet - wear your accomplishment with pride")
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm payment</button>
    </form>
  );
}
