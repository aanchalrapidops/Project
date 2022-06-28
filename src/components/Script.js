import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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
  console.log(completeData);

  async function Main(data) {
          const postRes = await postingData(data);
          console.log(postRes,"postres")
          if (typeof postRes === "string") {
            console.log("here")
            console.log("dddd",data)
            data.id = null;
            data.errorMessage = postRes.toLowerCase() + ".....";
            data.error = true;
            axios.post(
              "http://localhost:3000/reg",
              {
                fileName: fileName,
                isError: data.error,
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
                console.log("error", e);
              });
          }
  }

  useEffect(() => {
          for (let i = 0; i <completeData.length; i++) { 
            axios.get(
              `http://localhost:3000/getskuDetails/${completeData[i].SKU}`,
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then( async(data) => {
              if (data.data === "notnull") {
                console.log("vcmm",completeData[i]);
                await Main(completeData[i]);
                   if(i==completeData.length-1)
                   {
                     setCompleteData([...completeData])
                     console.log("data",data)
                    axios.post(
                      "http://localhost:3000/csv",
                      {
                        completeData:completeData
                      },
                      {
                        headers: { "Content-Type": "application/json" },
                      }
                    )
                    .then(() => {
                      console.log("dattttaaaa");
                    })
                    .catch((e) => {
                      console.log("erroarrrr", e);
                    });
                 }
              }
              else
              {
                completeData[i].Salesmateid = data.data.Salesmateid;
                if(i==completeData.length-1)
                {
                 setCompleteData([...completeData])
                //  console.log("completedata",completeData);
                 axios.post(
                   "http://localhost:3000/csv",
                   {
                      completeData:completeData
                   },
                   {
                     headers: { "Content-Type": "application/json" },
                   }
                 )
                 .then(() => {
                   console.log("dattttaaaa");
                 })
                 .catch((e) => {
                   console.log("errorofcsv", e);
                 });
              }
              }
            })
            .catch((e) => {
              console.log("error", e);
            });
          }
  }, []);

// console.log("comdataaaa",completeData)
  async function postingData(ele) {
    try {
      const body = {
        isActive: "true",
        tags: "import_test",
      };
      for (let [element, value] of Object.entries(selectedFields)) {
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
  for (let [element, value] of Object.entries(completeData[5])) {
    headerss.push({
      label: `${element[0].toUpperCase()}${element.slice(1)}`,
      key: `${element}`,
    });
  }
  data = [...completeData];
  data.shift();

  return (
    <div>
        <h1>We will mail you file when process will complete...</h1>
    </div>
  );
};
export default Script;