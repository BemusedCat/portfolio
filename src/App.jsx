import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { ViewModeProvider } from './hooks/useViewMode';
import { Header, Footer } from './components/layout';
import { Home, About, Experience, Education, Skills, Contact } from './components/sections';
import { CustomCursor, LoadingScreen, EasterEgg } from './components/ui';

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <EasterEgg />
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
