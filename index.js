const express = require("express");
const cookieParser = require("cookie-parser");
var i18n = require("i18n");
const ejs = require('ejs');
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const homeRouter = require("./routes/home");

const app = express();



const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: {
    __: function () {
      return i18n.__.apply(this, arguments);
    }
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

// app.engine("ejs", ejs.engine);
// app.set("view engine", "ejs");
// app.set("views", "views");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

i18n.configure({
  locales: ["uz", "kr"],
  fallbacks: { uz: "uz" },
  // defaultLocale: 'uz',
  cookie: "locale",
  queryParameter: "lang",
  directory: __dirname + "/locales",
  directoryPermissions: "755",
  autoReload: true,
  updateFiles: true,
  api: {
    "__": "__",
  },
});
app.use(i18n.init);
app.use("/", homeRouter);

app.get('/uz', (req, res) => {
  res.cookie('locale', 'uz', { maxAge: 900000, httpOnly: true });
  res.redirect('back');
});

app.get('/kr', (req, res) => {
  res.cookie('locale', 'kr', { maxAge: 900000, httpOnly: true });
  res.redirect('back');
});


async function start() {
  try {
    await mongoose.connect("mongodb://localhost/i18n", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const port = process.env.PORT || 3000;

    app.listen(port, () => console.log(`Server running ${port}`));
  } catch (error) {
    console.error(error);
  }
}

start();
