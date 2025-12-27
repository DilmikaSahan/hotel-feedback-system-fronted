import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/page/Home.jsx'
import AdminLogin from './pages/page/AdminLogin.jsx'
import AdminPage from './pages/page/AdminPage.jsx'
import FeedbackForm from './components/Feedback/FeedbackForm.jsx'
import LandingPage from './components/Feedback/steps/LandingPage.jsx' 
function App() {
  const [count, setCount] = useState(0)

  return (
  
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/adminLogin' element={<AdminLogin />} />
      <Route path='/adminPage' element={<AdminPage />}/>
      <Route path='/feedbackform' element={<FeedbackForm />}></Route>
      <Route path='/landingpage' element={<LandingPage />}></Route>
    </Routes>

  )
}

export default App
