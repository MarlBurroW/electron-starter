import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { Home } from '@/pages/Home'
import DesignSystem from '@/pages/DesignSystem'
import ApiDemo from '@/pages/ApiDemo'
import { Settings } from '@/pages/Settings'
import { About } from '@/pages/About'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/api-demo" element={<ApiDemo />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  )
}

export default App