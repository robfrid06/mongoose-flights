import { Flight } from '../models/flight.js';
import { Meal } from '../models/meal.js';

function index(req, res) {
  Flight.find({})
  .then(flights => {
    flights.sort((a, b) => a.departs - b.departs);
    res.render('flights/index', {
      title: 'All Flights',
      flights
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect('/');
  });
};

function newFlight(req, res) {
  const newFlight = new Flight();
  const defaultDeparts = newFlight.departs.toISOString().slice(0, 16);
  res.render('flights/new', {
    title: 'Add Flight',
    defaultDeparts
  });
};

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: `Flight No. ${flight.flightNo}`,
        flight,
        meals
      });
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights/show')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  });
};

function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      title: `Flight No. ${flight.flightNo}`,
      flight
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect('/flights');
  });
};

function create(req, res) {
  for (const key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  };
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights');
  })
  .catch(err => {
    console.log(err);
    res.redirect('/flights');
  });
};

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body);
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights');
    });
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

function deleteTicket(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    console.log(flight);
    flight.tickets.id(req.params.ticketId).remove();
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights');
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect('/flights');
  });
};

function addMeal(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.push(req.body.mealId);
    flight.save()
    .then(() => {
      res.redirect(`/flights/${ flight._id }`);
    })
    .catch(err => {
      console.log(err);
      res.redirect(`/flights/${ flight._id }`);
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect(`/flights/${ flight._id }`);
  });
};

function removeMeal(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.remove({_id: req.params.mealId});
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights');
    });
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
  createTicket,
  update,
  deleteFlight as delete,
  deleteTicket,
  addMeal,
  removeMeal,
}