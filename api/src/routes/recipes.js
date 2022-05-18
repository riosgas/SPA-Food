const { Router, response } = require('express');
const axios = require ('axios');

require('dotenv').config();
const { API_KEY } = process.env;

const { Recipe } = require('../db.js');

const router = Router();
// Configurar los routers

router.get('/', async (req, res, next) => {
    try {
        if (!req.query.name){
            let request = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
                .then(response => response.data);
            let info = request.results.map((r) => ({id:r.id, title:r.title, image:r.image, diets:r.diets}));
            return res.send(info)
        }
        const {name} = req.query;
        let request = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true`)
            .then(response => response.data);
        let info = request.results.map((r) => ({id:r.id, title:r.title, image:r.image, diets:r.diets}));
        return res.send(info)
    } catch (error) {
        // Si no existe ninguna receta mostrar un mensaje adecuado
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const reqId = req.params.id;
    try {
        let {id, title, image, diets, summary, spoonacularScore, healthScore, instructions} = await axios.get(`https://api.spoonacular.com/recipes/${reqId}/information?apiKey=${API_KEY}`)
            .then(response => response.data);
        //paso a paso
        return res.send({id, title, image, diets, summary, spoonacularScore, healthScore, instructions})
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    const { title, image, summary, diets, score, healthScore, instructions } = req.body;
    try {
        let recipe = await Recipe.create({
            title,
            image,
            summary,
            diets,
            score,
            healthScore,
            instructions
        });
        res.send('Recipe created');
    } catch (error) {
        next(error)
    }
})



module.exports = router;