import { createContext, useContext, useState, useEffect } from 'react';

const ViewModeContext = createContext();

export function ViewModeProvider({ children }) {
  const [isMaximalView, setIsMaximalView] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-view-mode');
      return saved === 'maximal';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('portfolio-view-mode', isMaximalView ? 'maximal' : 'minimal');
  }, [isMaximalView]);

  const toggleView = () => setIsMaximalView((prev) => !prev);

  // Keep isModernView as alias for backward compatibility
  return (
    <ViewModeContext.Provider value={{ isMaximalView, isModernView: isMaximalView, toggleView }}>
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
