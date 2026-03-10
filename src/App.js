import './index.css';
import Navbar from './components/Navbar';
import GlobalSolarSystemBackground from './components/GlobalSolarSystemBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import DayModeBackground from './components/DayModeBackground';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col min-h-screen">
      {theme === "dark" ? (
        <GlobalSolarSystemBackground />
      ) : (
        <DayModeBackground />
      )}
      <div className="relative z-10 mx-auto w-full flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
