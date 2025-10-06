// HomePage.jsx
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import VisionMission from "../components/VisionMission"
import CompanyValues from "../components/CompanyValues"
import Catalog from "../Catalog"
import Services from "../components/Services"
import ClientExperience from "../components/ClientExperience"
import Advantages from "../components/Advantages"
import MarketSegments from "../components/MarketSegments"
import Footer from "../components/Footer";

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
