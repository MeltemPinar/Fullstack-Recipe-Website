const { getData } = require("../utils/getData");
const { setData } = require("../utils/setData");
const crypto = require("crypto");
let data = getData();

//console.log(data);
exports.getAllRecipes = (req, res) => {
  let recipes = [...data];
  //aratılan terime eriş
  const searchTerm = req.query?.title?.trim().toLowerCase();
  //sıralama parametresine eriş

  const order = req.query.order;

  //eğer ki varsa aratılan terim, filtrele gönder
  if (searchTerm) {
    recipes = data.filter((recipe) =>
      recipe?.recipeName?.toLowerCase().includes(searchTerm)
    );
  }
  //eğer order varsa sırala gönder
  if (order) {
    recipes.sort((a, b) =>
      order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  //cevap gönder

  res.status(200).json({
    message: "Tarifler başarıyla gönderildi",
    results: recipes.length,
    recipes: recipes,
  });
};

exports.getRecipe = (req, res) => {
  //id si bilinen tarifi bul
  const recipe = data.find((i) => i.id == req.params.id);

  if (!recipe) {
    return res.status(404).json({
      message: "Aradığınız tarif bulunamadı",
    });
  }
  res.status(200).json({
    message: "Aradığınız tarif bulundu",
    recipe: recipe,
  });
};
exports.createRecipe = (req, res) => {
  //isteğin body sine gelen veriye eriş
  const newRecipe = req.body;
  //gelen verinin değerleri tanımlanmış mı
  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res
      .status(400)
      .json({ message: "Lütfen bütün değerleri tanımlayın" });
  }
  //veriye id ekle
  newRecipe.id = crypto.randomUUID;
  //yeni tarifi diziye ekle
  data.push(newRecipe);
  //yeni diziyi json dosyasına yaz
  setData(data);
  //cevap gönder
  res.status(200).json({ message: "Yeni tarif oluşturuldu" });
};

exports.deleteRecipe = (req, res) => {
  // silinecek elemanın sırasını bul
  const index = data.findIndex((i) => i.id == req.params.id);

  // sırası bilinen elemanı diziden kaldır
  data.splice(index, 1);

  // json dosyasını güncelle
  setData(data);

  // cevap gönder
  res.status(204).json({ message: "Tarif Başarıyla Silindi" });
};
