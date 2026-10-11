import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import LandingPage from './pages/landing'
import Authenticaion from './pages/authentication'
import AuthProvider from './contexts/AuthContext'
import VideoMeetComponent from './pages/videoMeet'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import HomeComponent from './pages/home'
import History from './pages/history'

function App() {

  return (
    <>
    <Router>

      <AuthProvider>
      <Routes>

        <Route path="/" element={<LandingPage />}/>
        
        <Route path='/home' element={<HomeComponent/>}/>
        <Route path='/auth' element={<Authenticaion/>}/>
        <Route path='/:url' element={<VideoMeetComponent/>}/>
        <Route path='/history' element={<History/>}/>

      </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App
