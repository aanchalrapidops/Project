import React, { useState, useEffect } from 'react'
import FieldSelected from './FieldSelected'
import axios from 'axios'
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
      {/* {Object.values(selected).includes('') ? (
        <button>save</button>
      ) : ( */}
        <button onClick={saveData}>save</button>
      {/* )} */}
    </>
  )
}

export default Fetch