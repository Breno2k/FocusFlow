import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
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
      <TimerProvider>
        <CronomemetroProvider>
          <BrowserRouter>
            <header>
              <nav>
                <Link to="/" className="link-reset">
                  <h2>FocusFlow</h2>
                </Link>
              </nav>
            </header>

            <h1 className='pb-6 font_brant'>FocusFlow</h1>
            <Navbar />
            <Routes>
              <Route path="/Cronometro" element={<Cronometro />} />
              <Route path="/TimerFocus" element={<TimerFoco />} />
              <Route path="/TimerPause" element={<TimerPause />} />
            </Routes>
          </BrowserRouter>
        </CronomemetroProvider>
      </TimerProvider>

      <footer>
        <p>FocusFlow © 2025</p>
      </footer>
    </>
  )
}

export default App
