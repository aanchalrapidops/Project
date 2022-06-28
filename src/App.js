
import React from 'react'
import './App.css'
import ParseExcel from './components/ParseExcel'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Script from './components/Script'

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="" element={<Home />}></Route> */}
        <Route path="" element={<ParseExcel />}></Route>
        <Route path="Script" element={<Script/>}></Route>
      </Routes>
    </>
  )
}

export default App