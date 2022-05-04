//Load express
const express = require("express");
//Load path module
const path = require("path");
//Load body-parser module
const bodyParser = require("body-parser");
//Load http-errors module
const createErrors = require("http-errors");
//Load routes module
const routes = require("./routes");
const app = express();
//Load config module
const configs = require("./config");
//Load productService module
const ProductService = require("./services/ProductService");
//Load contactService module
const ContactService = require("./services/ContactService");
//Load serviceService module
const ServiceService = require("./services/ServiceService");
//Load PersonaliseService module
const PersonaliseService = require("./services/PersonaliseService");

//Access the data in the config files
const config = configs[app.get("env")];

const productService = new ProductService(config.data.products);

const serviceService = new ServiceService(config.data.services);

const contactService = new ContactService(config.data.contact);

const personaliseService = new PersonaliseService(config.data.users);

//Set View Engine
app.set("view engine", "pug");

//Location to look for pug template
app.set("views", path.join(__dirname, "./views"));

//Pretty HTML
if (app.get("env") === "development") {
  app.locals.pretty = true;
}

//Access public assests
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//Create middleware to load the data every time a request is made to the server
app.use(async (req, res, next) => {
  try {
    //Load names
    const names = await productService.getNames();
    //Pass the productName back in the response
    res.locals.productNames = names;

    const names2 = await serviceService.getNames();
    res.locals.serviceNames = names2;

    return next();
  } catch (err) {
    return next(err);
  }
});

//Use routes module
app.use(
  "/",
  routes({
    productService: productService,
    contactService: contactService,
    serviceService: serviceService,
    personaliseService: personaliseService,
  })
);

//404 error
app.use((req, res, next) => {
  return next(createErrors(404, "File not found"));
});

//Display error message in pug
app.use((req, res, next) => {
  res.locals.messagge = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(status);
  return res.render("error");
});

//Start server
app.listen(3000);

//Exports
module.export = app;
