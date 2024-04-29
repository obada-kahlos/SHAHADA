import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(localStorage.theme === "dark");
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setIsReady] = useState({
    isReady: false,
    language: null,
  });

  const toggleSidebar = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const toggleTheme = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  const setReadyHandler = useCallback((lg) => {
    setIsReady({ isReady: true, language: lg });
    localStorage.setItem("lg", lg);
  }, []);

  const contextValue = {
    isOpen,
    darkMode,
    ready,
    toggleSidebar,
    toggleTheme,
    setReadyHandler,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
