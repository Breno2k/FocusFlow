import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'


// pages
import TimerFoco from './pages/TimerFoco'
import TimerPause from './pages/TimerPause'
import Navbar from './components/Navbar'

function App() {


  return (
    <>
      <h1>Focaí</h1>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TimerFoco />} />
          <Route path="/TimerPause" element={<TimerPause />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
