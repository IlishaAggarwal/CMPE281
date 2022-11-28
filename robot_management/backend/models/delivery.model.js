const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  robotname: { type: String },
  description: { type: String},
  duration: { type: Number, required: true },
  date :{type:String,required: true},
  deliveryStatus:{
    type: String,
    enum: ["OPEN","DELIVERED","CANCELLED"]
}
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;