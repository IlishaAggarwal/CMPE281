const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const robotSchema = new Schema({
  robotname: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3
  },
  isAvailable:{type: Boolean,default:true,required:true},
  robottype:{type:String, required: true},
  logs:{
    type:[String],
    select:"Robot created"
 }

}, {
  timestamps: true,
});

const Robot = mongoose.model('Robot', robotSchema);

module.exports = Robot;