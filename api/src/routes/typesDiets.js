const { Router } = require('express');

const {Diet} = require('../db.js');
const router = Router();

router.get('/', async (req, res, next) => {
    let diets = [
        {name: 'dairy free', text: 'Dairy Free', color: 'yellow'},
        {name: 'gluten free', text: 'Gluten Free', color: 'yellow'},
        {name: 'ketogenic', text: 'Ketogenic', color: 'brown'},
        {name: 'fodmap friendly', text: 'Low FODMAP', color: 'orange'},
        {name: 'pescatarian', text: 'Pescetarian', color: 'blue'},
        {name: 'paleolithic', text: 'Paleo', color: 'red'},
        {name: 'primal', text: 'Primal', color: 'red'},
        {name: 'vegan', text: 'Vegan', color: 'lightgreen'},
        {name: 'lacto ovo vegetarian', text: 'Vegetarian', color: 'seagreen'},
        {name: 'whole 30', text: 'Whole30', color: 'orange'}
    ]
    try {
        diets.forEach((d) => {
            Diet.findOrCreate({
                where: {name: d.name},
                defaults: {
                    name: d.name,
                    text: d.text,
                    color: d.color
                }
            });
        });
        let info = await Diet.findAll();
        res.json(info);
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;