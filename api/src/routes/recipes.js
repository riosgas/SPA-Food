const { Router, response } = require('express');
const axios = require ('axios');

require('dotenv').config();
const { API_KEY } = process.env;

const { Recipe, Diet } = require('../db.js');

const router = Router();
// Configurar los routers
const reg = /score of ([0-9]+)%/;

router.get('/', async (req, res, next) => {
    try {
        if (req.query.name){
            const {name} = req.query;
            let request = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true&number=18`)
                .then(response => response.data);
            let info = request.results.map((r) => ({id:r.id, title:r.title, image:r.image, diets:r.diets, score:r.healthScore}));
            return res.send(info);
        }
        if (req.query.diet){
            const {diet} = req.query;
            let request = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&diet=${diet}&addRecipeInformation=true&number=18`)
                .then(response => response.data);
            let info = request.results.map((r) => ({id:r.id, title:r.title, image:r.image, diets:r.diets, score:r.healthScore}));
            return res.send(info);
        }
        let request = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
            .then(response => response.data);
        //let score = reg.exec(r.summary)[1]
        let infoAPI = request.results.map((r) => ({id:r.id, title:r.title, image:r.image, diets:r.diets, score:r.healthScore}));
        
        let infoDb = await Recipe.findAll({ include: {
            model: Diet,
            attributes: ['name']
            }
        });
        infoDb = infoDb.map(e=> ({
            id: e.id,
            title: e.title,
            image: e.image,
            summary: e.summary,
            score: e.score,
            steps: e.steps,
            diets: e.diets.map(d=>d.name)
        }
        ))

        let info = [...infoAPI, ...infoDb];
        
        return res.send(info)
    } catch (error) {
        // Si no existe ninguna receta mostrar un mensaje adecuado
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const reqId = req.params.id;
    try {
        if (reqId.length < 15) {
            let {id, title, image, dishTypes, readyInMinutes, servings, healthScore, diets, summary, instructions, analyzedInstructions} = await axios.get(`https://api.spoonacular.com/recipes/${reqId}/information?apiKey=${API_KEY}`)
                .then(response => response.data);
            //paso a paso
            return res.send({id, title, image, dishTypes, readyInMinutes, servings, healthScore, diets, summary, instructions, analyzedInstructions})
        } else {
            //console.log('d')
            let recipeDetail = await Recipe.findByPk(reqId, {include: Diet});
            console.log('DETAIL es ', recipeDetail)
            return res.send(recipeDetail);
        }
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    console.log('ESTO ES BODY: ', req.body);
    let { title, image, summary, diets, score, healthScore, steps } = req.body;
    try {
        let newRecipe = await Recipe.create({
            title,
            image,
            summary,
            score: healthScore,
            steps
        });
        let findDiets = await Diet.findAll({
            where: {
                name: diets
            }
        });

        newRecipe.addDiets(findDiets);
        res.send('Recipe created '+ title);
    } catch (error) {
        next(error)
    }
})



module.exports = router;