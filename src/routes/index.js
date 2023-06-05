const { Router } = require('express');

const router = Router();
const {getRecipes} = require("../controllers/getRecipes")
const {getRecipesId} = require("../controllers/getRecipesId")
const {getRecipesName} = require("../controllers/getRecipesName");
const {postRecipes} = require("../controllers/postRecipes")
const {getDiets} = require("../controllers/getDiets")
const {login} = require("../controllers/login")


router.get('/login', login);


router.get("/recipes", (req, res) => {
    getRecipes(req, res);
})


router.get("/recipes/:idRecipe", (req, res) => {
    getRecipesId(req, res)
})


router.get("/recipesName", (req, res) => {
    getRecipesName(req, res);
})


router.post("/recipes", (req, res) => {
    postRecipes(req, res);
})


router.get("/diets", (req, res) => {
    getDiets(req, res);
})


module.exports = router;
