import React, { useState } from 'react'
import Fetch from './Fetch'
import * as XLSX from 'xlsx/xlsx.mjs'
const ParseExcel = () => {
  const [fileName, setfileName] = useState('')
  const [headers, setHeaders] = useState([])
  const [headerObj, setHeaderObj] = useState({})
  const [completeData, setCompleteData] = useState([])
  const handleFile = async (e) => {
    const file = e.target.files[0]
    setfileName(file.name)
    const data = await file.arrayBuffer()
    console.log('data', data)
    const workbook = XLSX.read(data)
    console.log(workbook)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(sheet, {
      header: 0,
      defval: '',
    })
    console.log(Object.keys(jsonData[0]))
    setCompleteData(jsonData)
    setHeaders(Object.keys(jsonData[0]))
    for (let [ele, val] of Object.entries(jsonData[0])) {
      jsonData[0][ele] = ''
    }
    setHeaderObj(jsonData[0])
  }
  console.log(
    'completeData',
    completeData,
  )

  return (
    <>
      {fileName ? <h1>{fileName}</h1> : ''}
      <br />
      <input type="file" onChange={(e) => handleFile(e)} />
      {headers.length > 0 ? (
        <div>
          <Fetch
            headers={headers}
            headerObj={headerObj}
            completeData={completeData}
            setHeaders={setHeaders}
            fileName={fileName}
          />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default ParseExcel
