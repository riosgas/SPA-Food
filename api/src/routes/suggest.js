const { Router } = require('express');
const router = Router();
const { Suggest } = require('../db.js');
const sugg =require ('./suggest.json');

// const axios = require ('axios');
// require('dotenv').config();
// const { API_KEY } = process.env;


router.get('/', async (req, res, next) => {
    let diet = ['gluten free','ketogenic','paleo','vegan','lacto ovo vegetarian'];
    let meal = ['main course','appetizer','breakfast','dessert','snack'];
    // //let sugg = [];
    // // for (let i = 0; i < meal.length; i++) {
    // //     for (let j = 0; j < diet.length; j++) {
    // //         let request = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&type=${meal[i]}&diet=${diet[j]}&number=4`)
    // //             .then(response => response.data);
    // //         let info = request.results.map((r) => ({id:r.id, title:r.title, image:r.image, meal: meal[i], diet:diet[j]}));
    // //         sugg.push(info)
    // //     }
    // // }
    // let i = 0;
    // let info = [];
    // suge.forEach(a => {
    //     a.forEach(b => {
    //         info = [...info, b];
    //         i++
    //     })
    // })
    // return res.send(suggest)
    try {
        sugg.forEach(s => {
            Suggest.findOrCreate({
                where: {id: s.id},
                defaults: {
                    id: s.id,
                    title: s.title,
                    image: s.image,
                    meal: s.meal,
                    diet: s.diet
                }
            });
        });
        // Model.find({
        //     order: [
        //         Sequelize.fn( 'RAND' ),
        //     ]
        // }); 
        let info = await Suggest.findAll({
            where: {
                diet: diet[Math.floor(Math.random()*4)],
                meal: meal[Math.floor(Math.random()*4)]
            }
        })
        res.json(info);
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;