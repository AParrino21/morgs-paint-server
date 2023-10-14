const router = require("express").Router();
const db = require("../../models");
require('dotenv').config();

const API = process.env.MORGS_API_URL
const S = process.env.MORGS_S_URL

router.get('/getCakeGirls', (req, res) => {
  fetch(`${API}cakeGirls`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    },
  }).then(response => {
    return response.json()
  }).then(data => {
    return res.json(data)
  })
})

router.get('/getHeader', (req, res) => {
  fetch(`${API}headers`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    },
  }).then(response => {
    return response.json()
  }).then(data => {
    return res.json(data)
  })
})

router.get('/oils', (req, res) => {
  db.Paintings.find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => {
      console.log(err)
      res.status(422).json(err)
    });
})

router.get('/oils/:id', (req, res) => {
  db.Paintings.findOne({ _id: req.params.id })
    .then(dbModel => res.json(dbModel))
    .catch(err => {
      console.log(err)
      res.status(422).json(err)
    });
})

router.get('/mixedmedia', (req, res) => {
  db.MixedMedia.find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => {
      console.log(err)
      res.status(422).json(err)
    });
})

router.get('/prints', (req, res) => {
  db.Prints.find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => {
      console.log(err)
      res.status(422).json(err)
    });
})

router.get('/prints/:id', (req, res) => {
  db.Prints.findOne({ _id: req.params.id })
    .then(dbModel => res.json(dbModel))
    .catch(err => {
      console.log(err)
      res.status(422).json(err)
    });
})

router.get('/mixedmedia/:id', (req, res) => {
  db.MixedMedia.findOne({ _id: req.params.id })
    .then(dbModel => res.json(dbModel))
    .catch(err => {
      console.log(err)
      res.status(422).json(err)
    });
})

router.put('/subtract', async (req, res) => {
  let data = req.body
  if (data.cat === 'painting') {
    db.Paintings.findByIdAndUpdate({ _id: data._id }, { inventory: data.inventory - 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      });
  }

  if(data.cat === 'mixed_media') {
    db.MixedMedia.findByIdAndUpdate({ _id: data._id }, { inventory: data.inventory - 1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => {
      console.log(err)
      res.status(422).json(err)
    });
  }

  if(data.cat === 'prints') {
    db.Prints.updateOne({_id: data.objId, src: {$elemMatch: {image_id: data.image_id}}} , {$set: {"src.$.inventory": data.srcUpdate[0].inventory}})
    .then(dbModel => res.json(dbModel))
    .catch(err => {
      console.log(err)
      res.status(422).json(err)
    });
  }
})

module.exports = router;