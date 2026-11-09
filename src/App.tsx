import { Route, Routes } from 'react-router'
import ScrollToTop from './components/ScrollToTop'
import Sidebar from './components/Sidebar'
import { LanguageProvider } from './i18n/LanguageProvider'
import About from './pages/About'
import Contact from './pages/Contact'
import Curriculum from './pages/Curriculum'
import ProjectDetail from './pages/ProjectDetail'
import Projects from './pages/Projects'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <div className="layout">
        <ScrollToTop />
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </LanguageProvider>
  )
}

export default App
