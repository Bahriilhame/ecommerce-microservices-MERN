import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutesComponent from './App.jsx'
import "./index.css"
// import Navbar from './Statics/Navbar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Navbar/> */}
    <RoutesComponent/>
  </React.StrictMode>,
)
