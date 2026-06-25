import Navbar from '../sections/Navbar.jsx'
import Hero from '../sections/Hero.jsx'
import VideoSection from '../sections/VideoSection.jsx'
import About from '../sections/About.jsx'
import TournamentBracket from '../sections/TournamentBracket.jsx'
import RegistrationCounter from '../sections/RegistrationCounter.jsx'
import Players from '../sections/Players.jsx'
import RegistrationForm from '../sections/registration/RegistrationForm.jsx'
import Footer from '../sections/Footer.jsx'
import { useRegistrationCount } from '../hooks/useRegistrationCount.js'

export default function HomePage() {
  const { count, max, full, loading, refresh } = useRegistrationCount()

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <VideoSection />
        <About />
        <TournamentBracket />
        <RegistrationCounter count={count} max={max} loading={loading} />
        <Players />
        <RegistrationForm full={full} onSubmitted={refresh} />
      </main>
      <Footer />
    </div>
  )
}
