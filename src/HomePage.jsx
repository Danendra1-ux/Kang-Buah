// HomePage.jsx
import Navbar from "/src/components/Navbar"
import Hero from "/src/components/Hero"
import About from "/src/components/About"
import VisionMission from "/src/components/VisionMission"
import CompanyValues from "/src/components/CompanyValues"
import Catalog from "/src/Catalog"
import Services from "/src/components/Services"
import ClientExperience from "/src/components/ClientExperience"
import Advantages from "/src/components/Advantages"
import MarketSegments from "/src/components/MarketSegments"
import Footer from "/src/components/Footer";

export default function HomePage() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <CompanyValues />
      <Catalog />
      <Services />
      <ClientExperience />
      <Advantages />
      <MarketSegments />
      <Footer />
    </div>
  )
}
