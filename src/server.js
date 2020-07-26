// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

//Added from Step 2 Create Payment Intent


const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51H7SKfKtUOKJLGFVMSL9gb6MGQAvgmGNPLZmMlb2MiN7yypHeS6P9zGJhEqwaV7mG8S5hvgXzdqidTTsC7E73qdd00oaHOKrC0');

app.get('/secret', async (req, res) => {
  console.log('Secret Requested')
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 11.11,
    currency: 'usd',
    metadata: {integration_check: 'accept_a_payment'},
  });

  res.json({client_secret: paymentIntent.client_secret});
});

app.listen(3001, () => {
  console.log('server running on localhost:3001');
});