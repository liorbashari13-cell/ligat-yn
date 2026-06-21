import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import AccessibilityPage from './pages/AccessibilityPage.jsx'
import AccessibilityWidget from './components/AccessibilityWidget.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
      </Routes>
      <AccessibilityWidget />
    </>
  )
}
