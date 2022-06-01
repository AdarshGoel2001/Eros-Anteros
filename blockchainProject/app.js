const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const axios = require("axios");
const ejsMate = require("ejs-mate");

// import fetch from "node-fetch";

const port = 3000;

app.engine("ejs", ejsMate);
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("./stylesheets/home");
});

app.get("/transfer", (req, res) => {
  res.render("./stylesheets/transfer");
});

app.get("/proof", async (req, res) => {
  // res.send(req.params);
  // res.render("proof");

  const { contractAddress, tokenID, recieverAddress } = req.query;
  const options = { method: "GET" };

  const apiKey = "sCQ3HEkQrXzkClii7H_aw4hHGqEBcheP";
  const baseURL = `https://eth-rinkeby.alchemyapi.io/v2/${apiKey}/getNFTMetadata`;
  const tokenType = "erc721";

  var config = {
    method: "get",
    url: `${baseURL}?contractAddress=${contractAddress}&tokenId=${tokenID}&tokenType=${tokenType}`,
    headers: {},
  };
  let resp;
  let add;
  await axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data, null, 2));
      resp = response.data.metadata;
      // add = response.data.contract.address;
      console.log(response.data);
    })
    .then(() => {
      res.render("./stylesheets/proofTry", {
        image: resp.image,
        noOfNFT: resp.noOfNFT,
        companyName: resp.companyName,
        address: recieverAddress,
        NFTname: resp.NFT_series_name,
      });
    })
    .catch((error) => console.log(error));
});

app.get("/newProducts", (req, res) => {
  res.render("./stylesheets/newProducts");
});

app.post("/newProducts", (req, res) => {
  // res.render("./stylesheets/mintNew");
});

app.get("/qr", (req, res) => {
  const { contractAddress, tokenID, recieverAddress } = req.query;
  console.log(tokenID);
  let uri = `http://localhost:3000/proof?contractAddress=${contractAddress}&tokenID=${tokenID}&recieverAddress=${recieverAddress}`;
  let encoded = encodeURIComponent(uri);
  res.render("./stylesheets/qr", { encoded });
});

app.post("/transfer", (req, res) => {});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});
