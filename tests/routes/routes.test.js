const app = require('../../src/app')
const session = require('supertest');
const request = session(app);


describe("RUTAS", () => {
    describe("RUTA GET /recipes/:idRecipe", () => {
        it("Responde con un status 400 si el 'id' ingresado no se encuentra en la API", async() => {
            const response = await request.get('/recipes/7825857');
            expect(response.statusCode).toBe(400);
        })

        it("Responde con un status 200 si el 'id' ingresado si se encuentra en la API", async() => {
            const response = await request.get('/recipes/782585');
            expect(response.statusCode).toBe(200);
        })

    })
})
