const router = require('express').Router();
let Robot = require('../models/robot.model');

router.route('/').get((req, res) => {
  Robot.find()
    .then(robots => res.json(robots))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/robots').get((req, res) => {
  Robot.find()
    .then(robots => res.json(robots))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log(req.body)
  const robotname = req.body.robotname;
  const robottype =req.body.robottype;

  const newRobot = new Robot({robotname,robottype});

  console.log(newRobot);

  newRobot.save()
    .then(() => res.json('Robot added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;