require('dotenv').config();
const axios = require("axios");
const {Recipe, Diet}= require("../db");
const {API_KEY, URL} = process.env;


const getRecipes = async (req, res) => {

    try {

        const {data} = await axios(`${URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);

        const apiRecipes = data.results.filter(recipeAll => recipeAll).map(recipe => {
            const instructions = recipe.analyzedInstructions && recipe.analyzedInstructions[0] ? recipe.analyzedInstructions[0].steps.map(step => step.step) : [];
            const diets = recipe.diets || recipe.Diets.map(diet => diet.name);
            return {  
              id: recipe.id,
              name: recipe.title,
              image: recipe.image,
              summary: recipe.summary.replace(/<[^>]*>/g, ''),
              healthScore: recipe.healthScore,
              steps: instructions,
              diets,
              api: true
            }
        });
        
        const dbRecipes = await Recipe.findAll({
            attributes: ['id', 'name', 'image', 'summary', 'healthScore', 'steps'],
            include: {model: Diet, attributes: ['name']}
        })
        const dbRecipesAll = dbRecipes.map(recipe => {
            const diets = recipe.diets || recipe.Diets.map(diet => diet.name);
            return { 
              id: recipe.id,
              name: recipe.name,
              image: recipe.image,
              summary: recipe.summary,
              healthScore: recipe.healthScore,
              steps: recipe.steps,
              diets,
              db: true
            }
        });
        
        const allRecipes = apiRecipes.concat(dbRecipesAll);

        if (allRecipes.length === 0) {
            return res.status(400).send(`No hay recetas con el nombre: ${name}`)
        }
        
        return res.status(200).json(allRecipes);
        
    } catch (error) {
        
        res.status(404).send(error.message)

    }

}


module.exports = {
    getRecipes
}