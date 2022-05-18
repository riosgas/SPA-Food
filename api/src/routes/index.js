const { Router, response } = require('express');
// Importar todos los routers;
const router = Router();

const recipes = require('./recipes.js');
const typesDiet = require('./typesDiets.js');
const suggest = require('./suggest');

// Configurar los routers
router.use('/recipes', recipes);
router.use('/types', typesDiet);
router.use('/suggest', suggest);


module.exports = router;
