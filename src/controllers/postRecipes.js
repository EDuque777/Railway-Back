const {Recipe, Diet}= require("../db");


const postRecipes = async (req, res) => {

    try {

        const {name, image, summary, healthScore, steps, diets} = req.body;
        

        if(!name || !image || !summary || !healthScore || !steps || !diets){
            return res.status(400).send("Faltan datos por completar");
        }

        const existingRecipe = await Recipe.findOne({ where: { name } });
        if (existingRecipe) {
            return res.status(400).send(`Ya existe una receta con el nombre: ${name}`);
        }
        if(healthScore.length < 0 || healthScore > 100 ){
            return res.status(400).send(`El HealthScore tiene que estar en el rango de 0 a 100`);
        }

        const createRecipe = await Recipe.create({name, image, summary, healthScore, steps})

        const dietsArray = diets;

        
        for (let i = 0; i < dietsArray.length; i++) {
          const dietInstance = await Diet.findOrCreate({ where: { name: dietsArray[i] } });
          await createRecipe.addDiet(dietInstance[0]);
        }
        
        const response = {
            id: createRecipe.id,
            name: createRecipe.name,
            image: createRecipe.image,
            summary: createRecipe.summary,
            healthScore: createRecipe.healthScore,
            steps: createRecipe.steps,
            diets: diets
          };

        return res.status(201).json(response)

    } catch (error) {
        
        res.status(404).send(error.message)

    }

}



module.exports = {
    postRecipes
}