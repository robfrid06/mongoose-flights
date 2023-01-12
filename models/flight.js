import mongoose from "mongoose";

const Schema = mongoose.Schema;

function generateFlightNo() {
  return Math.floor(Math.random() * (9999 - 10 + 1) + 10);
};

function defaultDeparts() {
  const today = new Date();
  const oneYearLater = today.getFullYear() + 1;
  today.setFullYear(oneYearLater);
  return today;
};

const ticketSchema = new Schema({
  seat: {type: String, match: /[A-F][1-9]\d?/, required: true},
  price: {type: Number, min: 0, required: true},
}, {
  timestamps: true
});

const flightSchema = new Schema({
  airline: String,
  airport: {type: String, default: 'DEN'},
  flightNo: {type: Number, default: generateFlightNo},
  departs: {type: Date, default: defaultDeparts},
  tickets: [ticketSchema],
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
}, {
  timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);

export {
  Flight
}