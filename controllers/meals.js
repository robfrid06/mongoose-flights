import { Meal } from '../models/meal.js';

function newMeal(req, res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      title: 'Add Meal',
      meals
    });
  })
};

function create(req, res) {
  Meal.find({name: req.body.name})
  .then(meals => {
    if (meals.length) {
      res.redirect('/meals/new');
    } else {
      Meal.create(req.body)
      .then(meal => {
        res.redirect('/meals/new');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/meals/new');
      });   
    };
  })
  .catch(err => {
    console.log(err);
    res.redirect('/meals/new');
  });
};

export {
  newMeal as new,
  create,
}