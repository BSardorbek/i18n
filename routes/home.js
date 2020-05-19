const { Router } = require("express");
const router = Router();
const News = require('../models/News')

router.get("/", async (req, res) => {
  let news = await News.find()
  let lang = req.cookies.locale
  console.log(lang);
  
  news = {
    phone: news.phone,
    address:news.address[`${lang}`]
}
  res.render("index", {
    title: "Home",
    news
  });
});

router.post('/',async (req, res) => {
  const news = new News({
    phone: req.body.phone,
    address: {
      uz:req.body.address_uz,
      kr:req.body.address_kr
    }
  })
console.log(news);

  await news.save()
  res.redirect('/')
})

module.exports = router;
