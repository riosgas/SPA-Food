const { Router } = require('express');

const {Diet} = require('../db.js');
const router = Router();

router.get('/', async (req, res, next) => {
    let diets = [
        {name: 'dairy free', text: 'Dairy Free', color: '#ffd987'},
        {name: 'vegan', text: 'Vegan', color: '#8af5a6'},
        {name: 'fodmap friendly', text: 'Low FODMAP', color: '#c298cd'},
        {name: 'pescatarian', text: 'Pescetarian', color: '#94bed8'},
        {name: 'paleolithic', text: 'Paleo', color: '#dda8a8'},
        {name: 'ketogenic', text: 'Ketogenic', color: '#d6a879'},
        {name: 'gluten free', text: 'Gluten Free', color: '#ffd987'},
        {name: 'lacto ovo vegetarian', text: 'Vegetarian', color: '#7fbd76'},
        {name: 'primal', text: 'Primal', color: '#dda8a8'},
        {name: 'whole 30', text: 'Whole30', color: '#ffd987'}
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