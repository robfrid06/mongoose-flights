import { Flight } from '../models/flight.js';

function index(req, res) {
  Flight.find({})
  .then(flights => {
    console.log(Date.parse(flights[0].departs.toString()), Date.now());
    flights.sort((a, b) => a.departs - b.departs);
    res.render('flights/index', {
      title: 'All Flights',
      flights: flights
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect('/');
  });
};

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  });
};

function show(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      title: `Flight No. ${flight.flightNo}`,
      flight: flight
    });
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
};

function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      title: `Flight No. ${flight.flightNo}`,
      flight: flight
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect('/flights');
  });
};

function create(req, res) {
  if (req.body.departs === '') req.body.departs = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  for (const key in req.body) {
    if (req.body[key] === '') req.body[key] = undefined;
  };
  Flight.create(req.body)
  .then(flight => {
    console.log(flight.departs.toISOString());
    res.redirect('/flights');
  })
  .catch(err => {
    console.log(err);
    res.redirect('/flights');
  });
};

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${req.params.id}`);
  })
  .catch(err => {
    console.log(err);
    res.redirect('/flights');
  });
};

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights');
  })
  .catch(err => {
    console.log(err);
    res.redirect('/flights');
  });
};


export {
  index,
  newFlight as new,
  show,
  edit,
  create,
  update,
  deleteFlight as delete,
}