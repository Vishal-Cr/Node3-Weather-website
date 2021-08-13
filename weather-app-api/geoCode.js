const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=2bf874c5748f44937e670d78baa5a64a&query=" +
    address;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services.", undefined);
    } else if (response.body.error) {
      callback("Unable to find Location,Try another search.", undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = geoCode;
