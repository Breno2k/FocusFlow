import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'


// pages
import TimerFoco from './pages/TimerFoco'
import TimerPause from './pages/TimerPause'
import Navbar from './components/Navbar'
import { TimerProvider } from './context/TimerContext'
import Cronometro from './pages/Cronometro'
import { CronomemetroProvider } from './context/CronometroContext'

function App() {


  return (
    <>
      <h1>Focaí</h1>
      <TimerProvider>
        <CronomemetroProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/Cronometro" element={<Cronometro />} />
              <Route path="/TimerFocus" element={<TimerFoco />} />
              <Route path="/TimerPause" element={<TimerPause />} />
            </Routes>
          </BrowserRouter>
        </CronomemetroProvider>
      </TimerProvider>

    </>
  )
}

export default App
