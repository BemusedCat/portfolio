import { createContext, useContext, useState, useEffect } from 'react';

const ViewModeContext = createContext();

export function ViewModeProvider({ children }) {
  const [isModernView, setIsModernView] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-view-mode');
      return saved === 'modern';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('portfolio-view-mode', isModernView ? 'modern' : 'classic');
  }, [isModernView]);

  const toggleView = () => setIsModernView((prev) => !prev);

  return (
    <ViewModeContext.Provider value={{ isModernView, toggleView }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export default function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within ViewModeProvider');
  }
  return context;
}
