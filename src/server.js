// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_51H7SKfKtUOKJLGFVMSL9gb6MGQAvgmGNPLZmMlb2MiN7yypHeS6P9zGJhEqwaV7mG8S5hvgXzdqidTTsC7E73qdd00oaHOKrC0');

//Added from Step 2 Create Payment Intent
const express = require('express');
const app = express();


app.get('/secret', async (req, res) => {
  console.log('Secret Requested')
  const intent = await stripe.paymentIntents.create({
    amount: 1111,
    currency: 'usd',
    metadata: {integration_check: 'accept_a_payment'},
  });

  res.json({client_secret: intent.client_secret});
});

//Testing out a local server
//app.listen(3001, () => {
  //console.log('server running on localhost:3001');

  app.listen(3000, () => {
    console.log('Running on port 3000');
});