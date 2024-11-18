const router = require("express").Router();
const db = require("../../models");
const API = process.env.MORGS_API_URL;

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

router.get("/getWeddingCommissions", (req, res) => {
  fetch(`${API}weddingCommissions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/getWeddingImg", (req, res) => {
  fetch(`${API}getWeddingImage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/updateTaskStatus", (req, res) => {
  const data = req.body
  fetch(`${API}updateTask`, {
    method: "PUT",
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

module.exports = router;
