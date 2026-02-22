import { createContext, useContext } from 'react';

const GoogleAuthContext = createContext({ enabled: false });

export const GoogleAuthProvider = ({ children, enabled }) => (
  <GoogleAuthContext.Provider value={{ enabled: !!enabled }}>
    {children}
  </GoogleAuthContext.Provider>
);

export const useGoogleAuthEnabled = () => useContext(GoogleAuthContext).enabled;
