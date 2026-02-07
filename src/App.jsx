import { ThemeProvider } from './hooks/useTheme';
import { Header, Footer } from './components/layout';
import { Home, About, Skills, Contact } from './components/sections';
import { CustomCursor } from './components/ui';

export default function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Header />
      <main className="mt-12 md:mt-16">
        <Home />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
