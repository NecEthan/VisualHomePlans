import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Editor from './pages/Editor'
import Gallery from './pages/Gallery'
import Project from './pages/Project'
import Materials from './pages/Materials'
import { MaterialProvider } from './context/MaterialContext'

function App() {
  return (
    <MaterialProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/editor/:projectId" element={<Editor />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="/materials" element={<Materials />} />
        </Routes>
      </Layout>
    </MaterialProvider>
  )
}

export default App
