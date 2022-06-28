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
// const user=await User();

app.post("/reg", async (req, res) => {
  // const usersData = new User(req.body);
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
//   converter.json2csv(req.body.completeData, (err, csv) => {
//     if (err) {
//         throw err;
//     }
//     // print CSV string
//     console.log(csv);
//     fs.writeFileSync('todos.csv', csv);
// });
console.log(req.body.completeData)
res.send("hiii")
})


mongoose
  .connect("mongodb://localhost/Product")
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.log("error:", err.message));
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log("listening on port 3000.."));
