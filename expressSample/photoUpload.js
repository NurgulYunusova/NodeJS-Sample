const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid");
var fs = require("fs");

app.use(express.json());
app.use(fileUpload());

app.post("/api/supplierPhotos", (req, res) => {
  let file = req.files.photo;
  let fileExt = file.name.substring(file.name.lastIndexOf("."));

  let path = __dirname + "/supplierImages/" + uuidv4() + fileExt;

  file.mv(path, function (err) {
    if (!err) res.send("Success!");
    else res.status(500).json(err);
  });
});

app.delete("/api/supplierPhotos/:name", (req, res) => {
  let photoName = req.params.name;

  fs.unlink(__dirname + "/supplierImages/" + photoName, function (err) {
    if (!err) {
      res.send("DELETED!!");
    } else {
      res.status(500).json(err);
    }
  });
});

app.listen(3003, () => {
  console.log("Express is running...");
});
