import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Services from "./components/Services";
import WhySenior from "./components/WhySenior";
import GlobalReach from "./components/GlobalReach";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <WhySenior />
      <GlobalReach />
      <Contact />
      <Footer />
    </main>
  );
}
