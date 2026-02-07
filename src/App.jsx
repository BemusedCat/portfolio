import { ThemeProvider } from './hooks/useTheme';
import { Header, Footer } from './components/layout';
import { Home, About, Skills, Contact } from './components/sections';

export default function App() {
  return (
    <ThemeProvider>
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
