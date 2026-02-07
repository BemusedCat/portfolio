import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { ViewModeProvider } from './hooks/useViewMode';
import { Header, Footer } from './components/layout';
import { Home, About, Experience, Education, Skills, Contact } from './components/sections';
import { CustomCursor, LoadingScreen, EasterEgg, ParticleBackground } from './components/ui';
import useViewMode from './hooks/useViewMode';

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isModernView } = useViewMode();

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <EasterEgg />
      {isModernView && <ParticleBackground />}
      <CustomCursor />
      <Header />
      <main className="mt-12 md:mt-16">
        <Home />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ViewModeProvider>
        <AppContent />
      </ViewModeProvider>
    </ThemeProvider>
  );
}
