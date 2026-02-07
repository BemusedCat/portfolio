import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { ViewModeProvider } from './hooks/useViewMode';
import { Header, Footer } from './components/layout';
import { Home, About, Experience, Education, Skills, Contact } from './components/sections';
import { CustomCursor, LoadingScreen, EasterEgg, AuroraBackground, FloatingActions, CursorTrail, CommandPalette, Scanlines, NeonCursor } from './components/ui';
import useViewMode from './hooks/useViewMode';
import useIsMobile from './hooks/useIsMobile';

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isModernView } = useViewMode();
  const isMobile = useIsMobile();

  // Disable cursor effects and heavy visuals on mobile
  const showCursorEffects = !isMobile;
  const showHeavyEffects = !isMobile;

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <EasterEgg />
      {isModernView && !isMobile && <AuroraBackground />}
      {isModernView && showCursorEffects && <CursorTrail />}
      {isModernView && showHeavyEffects && <Scanlines />}
      {showCursorEffects && (isModernView ? <NeonCursor /> : <CustomCursor />)}
      <Header />
      <main className={`mt-12 md:mt-16 ${isModernView ? 'text-white' : ''}`}>
        <Home />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <CommandPalette />
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
