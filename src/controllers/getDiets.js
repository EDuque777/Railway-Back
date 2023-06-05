require('dotenv').config();
const axios = require("axios");
const {Diet, Recipe} = require("../db")
const {API_KEY, URL} = process.env;


const getDiets = async (req, res) => {
    try {
      let dietsApi = [];
      let dietsDbAll = [];
      let diets = await Diet.findAll();
      let dietsDb = await Recipe.findAll({
        include: {
          model: Diet,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      })
      
      dietsDbAll = dietsDb.flatMap(recipe => recipe.Diets.map(diet => ({ id: diet.id, name: diet.name, db:true })))
      .filter((diet, index, self) => index === self.findIndex(d => d.id === diet.id && d.name === diet.name));

      if (diets.length === 0) {

         const { data } = await axios.get(`${URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
    
        let idCounter = 0;
        dietsApi = [...new Set(data.results.flatMap((diet) => diet.diets))]
        .map((diet) => ({ id: idCounter++, diet, api: true }));

        diets = [...new Set(data.results.map((result) => result.diets).flat())];
        
        await Promise.all(
          diets.map(async (diet) => {
            await Diet.create({ name: diet });
          })
        );
        diets = await Diet.findAll();
      }
      else{
        const { data } = await axios.get(`${URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
      let idCounter = 0;
        dietsApi = [...new Set(data.results.flatMap((diet) => diet.diets))]
        .map((diet) => ({ id: idCounter++, diet, api: true }));

      }
      const combinedDiets = [...dietsApi, ...dietsDbAll];
      return res.status(200).json(combinedDiets)

    } catch (error) {

        res.status(404).send(error.message);

    }
  };

module.exports = {getDiets}