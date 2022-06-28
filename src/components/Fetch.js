// import React, { useState, useEffect } from 'react'
// import Selected from './Selected'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// const Fetch = ({ headers, column, data }) => {

//   const [selectedData, setselectedData] = useState(column)
//   const [selectionArray, setSelectionArray] = useState([])
//   const navigate = useNavigate()
//   //   const [selected, setselected] = useState({})
//   useEffect(() => {
//     axios
//       .get(
//         'https://link_name.salesmate.io/apis/v3/fields/getAllVisibleFields',
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             accessToken: '3a2bbb61-aa33-11ea-9762-39ab38becb02',
//             'x-linkname': 'test.salesmate.io',
//           },
//         },
//       )
//       .then((res) => {
//         console.log('productdata', res.data.Data.product)
//         setSelectionArray(res.data.Data.product)
//       })
//       .catch((err) => {
//         console.log('error')
//         console.log(err)
//       })
//   }, [])
//   const saveData = () => {
//     console.log('selected', selectedData)
//     navigate('/Script', { state: { data, selectedData } })
//   }
//   return (
//     <>
//       {headers.map((item, index) => {
//         return selectionArray.length > 0 ? (
//           <div key={index} className="container">
//             <h2 class="left">{item}</h2>
//             <Selected
//               selectionArray={selectionArray}
//               headers={headers}
//               index={index}
//               setselectedData={setselectedData}
//               selectedData={selectedData}
//             />
//           </div>
//         ) : (
//           ''
//         )
//       })}
//       {Object.values(selectedData).includes('') ? (
//         <button disabled>save</button>
//       ) : (
//         <button onClick={saveData}>save</button>
//       )}
//     </>
//   )
// }
// export default Fetch


import React, { useState, useEffect } from 'react'
import FieldSelected from './FieldSelected'
import axios from 'axios'
// import './required.css'
import { useNavigate } from 'react-router-dom'

const Fetch = ({
  headers,
  headerObj,
  completeData,
  setHeaders,
  fileName,
}) => {
  const [selectionArr, setSelectionArr] = useState([])
  const [selected, setselected] = useState(headerObj)

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(
        'https://link_name.salesmate.io/apis/v3/fields/getAllVisibleFields',
        {
          headers: {
            'Content-Type': 'application/json',
            accessToken: '3a2bbb61-aa33-11ea-9762-39ab38becb02',
            'x-linkname': 'test.salesmate.io',
          },
        },
      )
      .then((res) => {
        setSelectionArr(res.data.Data.product)
      })
      .catch((err) => {
        console.log('123')
        console.log(err)
      })
  }, [])

  if (selectionArr.length > 0) {
    headers.forEach((ele, index) => {
      selectionArr.forEach((item) => {
        if (item.fieldName.toLowerCase() === headers[index].toLowerCase()) {
          selected[ele] = item.fieldName
        }
      })
    })
  }

  const saveData = () => {
    console.log('selected', selected)
    navigate('/Script', { state: { completeData, selected, fileName } })
  }
  return (
    <>
      {headers.map((item, index) => {
        return selectionArr.length > 0 ? (
          <div key={index} className="container">
            <h1 class="left">{item}</h1>
            <FieldSelected
              selectionArr={selectionArr}
              headers={headers}
              index={index}
              setselected={setselected}
              selected={selected}
              header={item}
              setHeaders={setHeaders}
            />
          </div>
        ) : (
          ''
        )
      })}
      {Object.values(selected).includes('') ? (
        <button disabled>save</button>
      ) : (
        <button onClick={saveData}>save</button>
      )}
    </>
  )
}

export default Fetch