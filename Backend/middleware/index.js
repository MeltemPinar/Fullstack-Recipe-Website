const { getData } = require("../utils/getData");

const data = getData();

exports.controlId = (req, res, next) => {
  // id'si bilinen tarifi bul
  const recipe = data.find((i) => i.id === req.params.id);

  // tarif dizide bulunmazsa hata gönder
  if (!recipe) {
    return next(
      res.status(404).json({ message: "Aradığınız id'li eleman bulunamadı" })
    );
  }

  req.recipe = recipe;
  next();
};
