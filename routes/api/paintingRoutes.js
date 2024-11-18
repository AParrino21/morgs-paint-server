const router = require("express").Router();
const db = require("../../models");
require("dotenv").config();
const stripe = require("stripe")(process.env.API_KEY_STRIPE);

const API = process.env.MORGS_API_URL;
const S = process.env.MORGS_S_URL;
const YOUR_DOMAIN = "https://www.morgandanton.com/thank-you-wedding";
const YOUR_DOMAIN_C = "https://www.morgandanton.com/";

router.get("/getCakeGirls", (req, res) => {
  fetch(`${API}cakeGirls`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    });
});

router.get("/getHeader", (req, res) => {
  fetch(`${API}headers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    });
});

router.get("/getContactPic", (req, res) => {
  fetch(`${API}contactPic`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    });
});

router.get("/getGalleryHeader", (req, res) => {
  fetch(`${API}galleryHeader`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    });
});

router.post("/sendWeddingData", (req, res) => {
  const data = req.body
  fetch(`${API}sendWeddingImg`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error)
    })
});

router.post("/wedding", (req, res) => {
  db.WeddingPortrait.find({})
    .then(async (dbModel) => {
      const priceId = {
        price_id: dbModel.filter((item) => item.price == req.body.price),
      };

      try {
        const response = await fetch(
          "https://morgs-paint-server-2-f7406efafa47.herokuapp.com/api/paintings/create-checkout-session",
          // "http://localhost:3001/api/paintings/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(priceId),
          }
        );

        const data = await response.json();

        if (response.ok) {
          res.json(data);
          console.log("wedding", data);
        } else {
          res.status(response.status).json(data);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create checkout session" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.post('/create-checkout-session', async (req, res) => {
  const { price_id } = req.body;
  if (!price_id) {
    return res.status(400).json({ error: 'Price ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price_id[0].price_id, 
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN_C}?canceled=true`,
      automatic_tax: { enabled: true },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

router.get("/oils", (req, res) => {
  db.Paintings.find({})
    .then((dbModel) => res.json(dbModel))
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.get("/oils/:id", (req, res) => {
  db.Paintings.findOne({ _id: req.params.id })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.get("/mixedmedia", (req, res) => {
  db.MixedMedia.find({})
    .then((dbModel) => res.json(dbModel))
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.get("/prints", (req, res) => {
  db.Prints.find({})
    .then((dbModel) => res.json(dbModel))
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.get("/prints/:id", (req, res) => {
  db.Prints.findOne({ _id: req.params.id })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.get("/mixedmedia/:id", (req, res) => {
  db.MixedMedia.findOne({ _id: req.params.id })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.put("/subtract", async (req, res) => {
  let data = req.body;
  if (data.cat === "painting") {
    db.Paintings.findByIdAndUpdate(
      { _id: data._id },
      { inventory: data.inventory - 1 }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  }

  if (data.cat === "mixed_media") {
    db.MixedMedia.findByIdAndUpdate(
      { _id: data._id },
      { inventory: data.inventory - 1 }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  }

  if (data.cat === "prints") {
    db.Prints.updateOne(
      { _id: data.objId, src: { $elemMatch: { image_id: data.image_id } } },
      { $set: { "src.$.inventory": data.srcUpdate[0].inventory } }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  }

  if (data.cat === "bday") {
    fetch(`${API}subtractInventory`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return res.json(data);
      });
  }
});

module.exports = router;
