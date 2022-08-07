const express = require('express');
const routes = require('./routes');
const stripe = require('stripe')('sk_test_51LEnEdElbRpz7PMDLGNiydmgUq3Qr9qZieFKx9e8Mb6ad7kJaopvsLRonfdWA1ipFNZrVNPKv4CVJwFEx2Cj3isR00Bc1StOv0');
const mongoose = require('mongoose')
const cors = require('cors');

const YOUR_DOMAIN = 'http://localhost:3000';

const PORT = process.env.PORT || 3001;
const app = express();

require('dotenv').config();

const uri = process.env.DB;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((e) => {
  console.log("DB connected")
})

var whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// stripe checkout
app.post('/create-checkout-session', async (req, res) => {

  let items = []
  for (let i = 0; i < req.body.length; i++) {
    let obj = {
      price: req.body[i].price,
      quantity: 1,
    }

    items.push(obj)
  }

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    // [
    //   {
    //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //     price: '{{PRICE_ID}}',
    //     quantity: 1,
    //   },
    // ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: { enabled: true },
  });

  res.json({ url: session.url })
});
// end stripe checkout

// db.once('open', () => {
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
// });