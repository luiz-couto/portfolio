import { Route, Routes } from 'react-router'
import Sidebar from './components/Sidebar'
import About from './pages/About'
import Contact from './pages/Contact'
import Curriculum from './pages/Curriculum'
import Projects from './pages/Projects'
import './App.css'

function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
