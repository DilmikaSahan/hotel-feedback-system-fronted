import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/page/Home.jsx'
import AdminLogin from './pages/page/AdminLogin.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/adminLogin' element={<AdminLogin />} />
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
