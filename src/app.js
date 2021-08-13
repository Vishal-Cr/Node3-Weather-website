const path = require("path");
const geoCode = require("../weather-app-api/geoCode");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "./templates/");
const partialsPath = path.join(__dirname, "./templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vishal Anthony",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Vishal Anthony",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HelpDesk",
    category: "Please Select Category",
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    header: "Error 404 Not Found",
    paragraph: "The help page you were looking For does not Exist.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You Must Provide a Location.",
    });
  } else {
    geoCode(req.query.address, (error, data) => {
      if (error) {
        return res.send({
          error: error,
        });
      } else {
        return res.send({
          location: data.location,
          Temperature: data.current.temperature,
          feels_like: data.current.feelslike,
          chance_of_rain: data.current.precip + "%",
          weather_icon: data.current.weather_icons,
          Description: data.current.weather_descriptions[0],
        });
      }
    });
  }
});

app.get("*", (req, res) => {
  res.render("error", {
    header: "Error 404! ",
    paragraph: "Page Not Found.",
  });
});
app.listen(port, () => {
  console.log("The Server is up and Running.");
});
