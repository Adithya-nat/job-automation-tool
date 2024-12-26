import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ResumeEnhancer from './pages/ResumeEnhancer'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-enhancer" element={<ResumeEnhancer />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
