const express = require("express");
const routes = require("./routes");
const stripe = require("stripe")(process.env.API_KEY_STRIPE);
const mongoose = require("mongoose");
const cors = require("cors");

const YOUR_DOMAIN = "https://www.morgandanton.com/thanks";
// const YOUR_DOMAIN = 'https://dev-morgandanton.netlify.app/thanks';
// const YOUR_DOMAIN = 'http://localhost:5173/thanks';
const YOUR_DOMAIN_C = "https://www.morgandanton.com/";

const PORT = process.env.PORT || 3001;
const app = express();

require("dotenv").config();

const uri = process.env.DB;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((e) => {
    console.log("DB connected");
  });

var whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:5173",
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "75mb" }));
app.use(express.json({ limit: "75mb" }));
app.use(routes);

// stripe checkout
app.post("/create-checkout-session", async (req, res) => {
  let items = [];
  for (let i = 0; i < req.body.length; i++) {
    let obj = {
      price: req.body[i].price_id,
      quantity: 1,
    };

    items.push(obj);
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
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN_C}?canceled=true`,
    automatic_tax: { enabled: true },
  });

  res.json({ url: session.url });
});
// end stripe checkout

// db.once('open', () => {
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
// });
