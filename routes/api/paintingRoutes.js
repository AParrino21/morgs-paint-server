const router = require("express").Router();
const db = require("../../models");

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

module.exports = router;