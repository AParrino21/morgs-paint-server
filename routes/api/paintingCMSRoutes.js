const router = require("express").Router();
const db = require("../../models");

router.post("/oils", (req, res) => {
  db.Paintings.create(req.body)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.post("/mixed", (req, res) => {
  db.MixedMedia.create(req.body)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.put("/oils/:id", (req, res) => {
  db.Paintings.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.put("/mixed/:id", (req, res) => {
  db.MixedMedia.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

router.delete("/oils/:id", (req, res) => {
    db.Paintings.findByIdAndDelete({ _id: req.params.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  });
  
  router.delete("/mixed/:id", (req, res) => {
    db.MixedMedia.findByIdAndDelete({ _id: req.params.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  });

module.exports = router;
