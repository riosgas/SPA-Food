const { Router, response } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require ('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {Diet, Recipe} = require('../db.js');

const router = Router();
const apiK = {headers: {'x-api-key': API_KEY}}
// Configurar los routers

router.get('/recipes', async (req, res, next) => {
    try {
        const {name} = req.query;
        let info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true`).then(response => response.data);
        return res.send(info)
    } catch (error) {
        // Si no existe ninguna receta mostrar un mensaje adecuado
        next(error)
    }
})

router.get('/recipes/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        // Debe traer solo los datos pedidos en la ruta de detalle de receta
        // Incluir los tipos de dieta asociados
        let info = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, apiK).then(response => response.data);
        //await console.log(info)
        return res.send(info)
    } catch (error) {
        next(error)
    }
})

// [ ] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.get('/types', async (req, res, next) => {
    
})

// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
router.post('/recipe', async (req, res, next) => {
    
})


// gluten free
// lacto ovo vegetarian
// vegan
// primal
// pescatarian
// paleolithic
// fodmap friendly
// dairy free
// ketogenic
// whole 30
module.exports = router;
