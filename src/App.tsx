import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import HomePage from './pages/HomePage'
import AuditPage from './pages/AuditPage'
import ApplyPage from './pages/ApplyPage'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hr" element={<HomePage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/hr/audit" element={<AuditPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/hr/apply" element={<ApplyPage />} />
      </Routes>
    </MotionConfig>
  )
}
