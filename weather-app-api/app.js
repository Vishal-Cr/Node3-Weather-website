const geoCode = require("./geoCode");
const address = process.argv[2];
if (!address) {
  console.log("please provide an address");
} else {
  geoCode(address, (error, data) => {
    if (!error) {
      console.log("Data:", data);
    } else {
      console.log(error);
    }
  });
}
