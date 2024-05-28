const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const {
  getAllRecipes,
  getRecipe,
  deleteRecipe,

  createRecipe,
} = require("./controllers/recipeController");
const { controlId } = require("./middleware/index");
//route tanımı
app.route("/api/recipes").get(getAllRecipes).post(createRecipe);

app
  .route("/api/recipes/:id")
  .get(controlId, getRecipe)

  .delete(controlId, deleteRecipe);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunu dinlemeye başladı`);
});
