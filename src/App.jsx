import { BrowserRouter, Route, Routes, Link, useLocation } from 'react-router-dom'
import './App.css'

// pages
import TimerFoco from './pages/TimerFoco'
import TimerPause from './pages/TimerPause'
import Navbar from './components/Navbar'
import { TimerProvider } from './context/TimerContext'
import Cronometro from './pages/Cronometro'
import { CronomemetroProvider } from './context/CronometroContext'
import { Toaster } from './components/ui/sonner'

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="link-reset">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Focus
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Flow
              </span>
            </h3>
          </Link>
        </nav>
      </header>

      {/* Título Principal */}
      <div className="relative mb-8">
        <h1 className="text-7xl md:text-8xl font-black text-white mb-4 tracking-tight">
          Focus
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Flow
          </span>
        </h1>

        {/* Efeito de brilho animado */}
        <div className="absolute inset-0 text-7xl md:text-8xl font-black text-white opacity-20 animate-pulse blur-sm">
          FocusFlow
        </div>
      </div>

      {isHome && (
        <>
          {/* Subtítulo */}
          <div className="mb-12 space-y-6">
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed">
              Uma ferramenta para
              <span className="font-semibold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent"> turbinar </span>
              sua produtividade!
            </p>

            {/* Descrição */}
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
                Inspirado na
                <span className="text-cyan-300 font-medium"> Técnica Pomodoro</span>,
                você consegue controlar suas sessões de concentração e pausas personalizadas
                de acordo com sua
                <span className="text-purple-300 font-medium"> preferência</span>.
              </p>
            </div>
          </div>
        </>
      )
      }

      <Navbar />
      <Routes>
        <Route path="/Cronometro" element={<Cronometro />} />
        <Route path="/TimerFocus" element={<TimerFoco />} />
        <Route path="/TimerPause" element={<TimerPause />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <>
      <TimerProvider>
        <CronomemetroProvider>
          <BrowserRouter>
            <Toaster richColors position="top-right" />
            <AppContent />
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