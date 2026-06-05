import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import RegistrationCounter from './sections/RegistrationCounter.jsx'
import Players from './sections/Players.jsx'
import RegistrationForm from './sections/registration/RegistrationForm.jsx'
import Footer from './sections/Footer.jsx'
import { useRegistrationCount } from './hooks/useRegistrationCount.js'

export default function App() {
  // Single polling source — shared by the counter and the form.
  const { count, max, full, loading, refresh } = useRegistrationCount()

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <RegistrationCounter count={count} max={max} loading={loading} />
        <Players />
        <RegistrationForm full={full} onSubmitted={refresh} />
      </main>
      <Footer />
    </div>
  )
}
