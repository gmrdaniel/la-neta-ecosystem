import { Routes, Route } from 'react-router-dom'
import { ContactModalProvider } from './contexts/ContactModalContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HeroSection } from './sections/HeroSection'
import { WhoIsLaNeta } from './sections/WhoIsLaNeta'
//import { BranchOfficeLocations } from './sections/BranchOfficeLocations'
import { PartnershipsAlliances } from './sections/PartnershipsAlliances'
import { ServicesCTA } from './sections/ServicesCTA'
import { CreatorSupplyEcosystem } from './sections/CreatorSupplyEcosystem'
import { LetsWorkTogetherSection } from './sections/theAdFactory/LetsWorkTogetherSection'
import { ServicesPage } from './pages/ServicesPage'

function App() {
  return (
    <ContactModalProvider>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <WhoIsLaNeta />
              {/* B2B: Partnerships right after main offer = proof before second pillar (Elevn) and CTA */}
              <PartnershipsAlliances />
              <ServicesCTA />
              <CreatorSupplyEcosystem />
              {/*<BranchOfficeLocations />*/}
              <div id="lets-work-together" className="scroll-mt-24 bg-[var(--laneta-bg)] py-16 md:py-20">
                <LetsWorkTogetherSection variant="global" />
              </div>
              <Footer />
            </>
          }
        />
        <Route path="/the-ad-factory" element={<ServicesPage />} />
        <Route path="/the-glitch" element={<ServicesPage />} />
        <Route path="/the-hook-hunter" element={<ServicesPage />} />
      </Routes>
    </ContactModalProvider>
  )
}

export default App
