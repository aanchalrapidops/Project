const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fs = require('fs');

const cors = require("cors");
app.use(cors());
const converter = require('json-2-csv');

app.use(express.json());
const userSchema = new mongoose.Schema({
  sku: {
    type: String,
  },
  fileName: {
    type: String,
  },
  isError: {
    type: Boolean,
  },
  Salesmateid: {
    type: String,
  },
  ErrorName: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);

app.get("/getalldata", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

app.post("/reg", async (req, res) => {
  const usersData = new User(req.body);
  console.log(req.body)
  try {
    const ress = await usersData.save();
    res.status(200).json(ress);
  } catch {
    res.status(400).json("error");
  }
});


app.get("/getskuDetails/:skuid", async (req, res) => {
  console.log("skuuuidd", req.params.skuid);

  const skudetails = await User.findOne({ sku: req.params.skuid });
  console.log("qwertyuiop====", skudetails);
  if (skudetails) 
      { 
      if (skudetails.Salesmateid) 
            {
             return res.send({Salesmateid:skudetails.Salesmateid,message:"null"});
            }
            return res.send("notnull");
       }
 else
        {
            return res.send("notnull");
        }
});



app.post("/csv",async(req,res)=>{
const date = new Date()
const format = `

${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date
.getHours()
.toString()
.padStart(2, '0')}-
${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`

// $product-import-error-${requiredFormat}.csv


console.log("reqarr",req.body.completeData)
const resulterr = req.body.completeData.filter(obj => {
  return obj.error === true;
});
const resultid = req.body.completeData.filter(obj => {
  return obj.error == false;
});
  converter.json2csv(resultid, (err, csv) => {
    if (err) {
        throw err;
    }
    console.log(csv);
    fs.writeFileSync(`../product-import-success-${format}.csv`, csv);
  });
    converter.json2csv(resulterr, (err, csv) => {
      if (err) {
          throw err;
      }
      console.log(csv);
      fs.writeFileSync(`../product-import-error-${requiredFormat}.csv`, csv);
    });
// });
})
mongoose
  .connect("mongodb://localhost/Product")
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.log("error:", err.message));
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log("listening on port 3000.."));
