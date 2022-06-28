// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const userSchema = new mongoose.Schema({
//    sku:{
//       type: String
//    },
//    Error:{
//        type:String
//     },
//    isError:{
//        type:boolean
//    },
//    salesMateid:{
//     type:String
//    },
//    FileName:{
//     type:String
//    }
// });
// const User = mongoose.model('User', userSchema);
// app.post('/', async (req, res) => {
//     console.log("req.body====",req.body)
//     const users = await User({ sku: req.body.sku, Error: req.body.Error, isError: req.body.isError, salesMateid: req.body.salesMateid, FileName:req.body.FileName});
//     if (users) return res.status(400).send(" already in db");
//     const usersData = new User(req.body);
//     try {
//         const ress = await usersData.save();
//         res.status(200).json(ress);
//     } catch {
//         res.status(400).json('error')
//     }
// });
// // app.get('/get',async(req,res)=>{
// //     // console.log(req.body)
// //     const user=await User.find().sort('firstname');
// //     res.send(user);
// //     });

//     mongoose.connect('mongodb://localhost/Product')
//     .then(() => console.log('connected to mongodb...'))
//     .catch(err => console.log('error:', err.message));


const fs = require('fs');
  
let data = "This is a file containing a collection of books.";
  
fs.writeFile("books.txt", data, (err) => {
  if (err)
    console.log(err);
  else {readFileSync
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(fs.readFileSync("books.txt", "utf8"));
  }
});
