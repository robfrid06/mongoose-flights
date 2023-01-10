import mongoose from "mongoose";

const Schema = mongoose.Schema;

function generateFlightNo() {
  return Math.floor(Math.random() * (9999 - 10 + 1) + 10);
};

const flightSchema = new Schema({
  airline: String,
  airport: {type: String, default: 'DEN'},
  flightNo: {type: Number, default: generateFlightNo},
  departs: {type: Date, defaut: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()}
}, {
  timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);

export {
  Flight
}