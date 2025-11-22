import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for session flag in sessionStorage
    const isSessionAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isSessionAuthenticated) {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
};
