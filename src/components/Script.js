import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
// const converter = require('json-2-csv');
const Script = () => {
  const location = useLocation();
  const POST_URL = "https://link_name.salesmate.io/apis/v1/products";
  let data = [];
  let headerss;
  const [completeData, setCompleteData] = useState(
    () => location.state.completeData
  );
  const fileName = location.state.fileName;
  const selectedFields = location.state.selected;
  const [loading, setLoading] = useState(true);
  console.log(completeData);
  async function Main(data) {
    // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    //   for (let i = 368; i < 370; i++) {
      
          const postRes = await postingData(data);
          if (typeof postRes === "string") {
            console.log("here")
            data.id = null;
            data.errorMessage = postRes.toLowerCase() + ".....";
            data.error = true;
            axios.post(
              "http://localhost:3000/reg",
              {
                fileName: fileName,
                isError: false,
                Salesmateid: data.id,
                ErrorName:  data.errorMessage,
                sku: data.SKU,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then(() => {
              console.log("record updated.....");
            })
            .catch((e) => {
              // console.log("aataatatahjbhjbhjgfh");
              console.log("errorrr", e);
            });
          }
           else 
          {
            console.log("here1")
            data.id = String(postRes);
            data.errorMessage = "";     
             data.errorMessage = "";

            data.error = false;
             axios.post(
                "http://localhost:3000/reg",
                {
                  fileName: fileName,
                  isError: false,
                  Salesmateid: data.id,
                  ErrorName:  data.errorMessage,
                  sku: data.SKU,
                },
                {
                  headers: { "Content-Type": "application/json" },
                }
              )
              .then(() => {
                console.log("inserted");
              })
              .catch((e) => {
                // console.log("aataatatahjbhjbhjgfh");
                console.log("error", e);
              });
          }
        // }
  }
  useEffect(  () => {
          for (let i = 2; i <50; i++) { 
            axios.get(
              `http://localhost:3000/getskuDetails/${completeData[i].SKU}`,
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then( async(data) => {
              // console.log(data);
              if (data.data === "notnull") {
                // console.log('innnn');
                console.log("vcmm",completeData[i]);
                console.log('null');
                await Main(completeData[i]);
                // console.log(completeData("heyytrgee");
                // await postingData(completeData[i]);
                   if(i==3)
                   {
                     console.log("byyyyyy")
                     setCompleteData([...completeData])
                    //  console.log("data",data)
                    // axios.post(
                    //   "http://localhost:3000/csv",
                    //   {
                    //    data:data
                    //   },
                    //   {
                    //     headers: { "Content-Type": "application/json" },
                    //   }
                    // )
                    // .then(() => {
                    //   console.log("dattttaaaa");
                    // })
                    // .catch((e) => {
                    //   console.log("erroarrrr", e);
                    // });
                 }
              }
              else{
                console.log('not');
                completeData[i].Salesmateid = data.data.Salesmateid;
                if(i==3)
                {
                  console.log("hhhhh")
                 setCompleteData([...completeData])

                //   reqArr.i.push(errorMessage);
                  

                //   console.log("reqqqarrr",reqArr)
                //  axios.post(
                //    "http://localhost:3000/csv",
                //    {
                      
                //    },
                //    {
                //      headers: { "Content-Type": "application/json" },
                //    }
                //  )
                //  .then(() => {
                //    console.log("dattttaaaa");
                //  })
                //  .catch((e) => {
                //    // console.log("aataatatahjbhjbhjgfh");
                //    console.log("erroarrrr", e);
                //  });
              }
              }
              // if(i==200)
              // {
              //   converter.json2csv(todos, (err, csv) => {
              //     if (err) {
              //         throw err;
              //     }
              //     // print CSV string
              //     console.log(csv);
              
              //     // write CSV to a file
              //     fs.writeFileSync('todos.csv', csv);
                  
              // });

              // }
            })
            .catch((e) => {
              console.log("errorrr", e);
            });
          }
          // if(i==200){
          //   fs.writeFile("abc.txt", data, (err) => {
          //     if (err)
          //       console.log(err);
          //     else {readFileSync
          //       console.log("File written successfully\n");
          //       console.log("The written has the following contents:");
          //       console.log(fs.readFileSync("abc.txt", "utf8"));
          //     }
          //   });
          // }

  }, []);

console.log("comdataaaa",completeData)


  useEffect(  () => {
    const reqArr = completeData.slice(0,3);

    axios.post(
         "http://localhost:3000/csv",
         {
            completeData : reqArr
         },
         {
           headers: { "Content-Type": "application/json" },
         }
       )
       .then(() => {
         console.log("dattttaaaa");
       })
       .catch((e) => {
         // console.log("aataatatahjbhjbhjgfh");
         console.log("erroarrrr", e);
       });

  }, [completeData]);


  async function postingData(ele) {
    try {
      const body = {
        isActive: "true",
        tags: "import_test",
      };
      for (let [element, value] of Object.entries(selectedFields)) {
        console.log("selectedddfield","ele",selectedFields[element],ele[element])
        body[`${selectedFields[element]}`] = ele[`${element}`];
      }
      body["isActive"] = "true";
      body["tags"] = "import_test";
      body["currency"] = "INR";
      const res = await axios.post(POST_URL, body, {
        headers: {
          "Content-Type": "application/json",
          accessToken: "3a2bbb61-aa33-11ea-9762-39ab38becb02",
          "x-linkname": "test.salesmate.io",
        },
      });
      return res.data.Data.id;
    }
     catch (err) {
      return JSON.stringify(err.response.data.Error.Message);
    }
  }
  console.log(completeData, "complete data");
  headerss = [];
  for (let [element, value] of Object.entries(completeData[100])) {
    headerss.push({
      label: `${element[0].toUpperCase()}${element.slice(1)}`,
      key: `${element}`,
    });
  }
  data = [...completeData];
  data.shift();
  console.log(headerss);
  console.log("dataaaaaaaaa",data);
  return (
    <div>
      {!loading && data.length > 0 && headerss?.length > 0 ? (
            <h1>hi</h1>
      ) : (
        <h1>We will mail you file when process will complete...</h1>
      )}
    </div>
  );
};
export default Script;