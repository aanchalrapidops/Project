
import React, { useState, useEffect } from 'react'

const FieldSelected = ({ selectionArr, headers, index, setselected, selected }) => {
  console.log(selected)
  return (
    <form> 
      <select
        name={headers[index]}
        onChange={(event) => {
          setselected({ ...selected, [event.target.name]: event.target.value })
        }}
        // value={selected[headers[index]]}
      >
        <option value="">select a field</option>
        {selectionArr.map((item, index2) => {
          if (item.fieldName.toLowerCase() === headers[index].toLowerCase()) {
            return (
              <option key={index2} value={item.fieldName} selected>
                {item.displayName}
              </option>
            )
          } else {
            return (
              <option key={index2} value={item.fieldName}>
                {item.displayName}
              </option>
            )
          }
        })}
      </select>
    </form>
  )
}

export default FieldSelected