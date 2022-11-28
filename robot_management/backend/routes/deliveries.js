const router = require('express').Router();
let Delivery = require('../models/delivery.model');
const mongoose = require('mongoose');


router.route('/').get((req, res) => {
  Delivery.find()
    .then(deliveries => res.json(deliveries))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add').post((req, res) => {
  const robotname = req.body.robotname;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newDelivery = new Delivery({
    robotname,
    description,
    duration,
    date,
  });

  newDelivery.save()
  .then(() => res.json('Delivery added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});






router.route('/:id').get((req, res) => {
  Delivery.findById(req.params.id)
    .then(delivery => res.json(delivery))
    .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/:id').delete((req, res) => {
  Delivery.findByIdAndDelete(req.params.id)
    .then(() => res.json('Delivery deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});





router.route("/getlog").post((req, res) => {
  console.log(req)
  Delivery.find({robotname : req.body.robotname })
    .then(deliveries=>res.json(deliveries))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;