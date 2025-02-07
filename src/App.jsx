import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import NavbarComponent from './components/NavbarComponent'
import CategoryComponent from './components/CategoryComponent'
import axios from 'axios'

axios.defaults.baseURL = 'https://dummyjson.com'
function App() {

const [activeHeader, setActiveHeader] = useState(true);
  return (
    <>
      <div>
        {activeHeader && <HeaderComponent setActiveHeader= {setActiveHeader} />}
        <NavbarComponent/>
        <CategoryComponent/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
