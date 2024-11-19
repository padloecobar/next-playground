import React, { createContext, useContext } from 'react';

// Define the type for the flag value
export type GlobalContext = {
  streaming?: boolean | undefined;
  delay?: boolean | undefined
};

// Create the context with a default value
const GlobalFlagContext = createContext<GlobalContext | undefined>(
  undefined
);

// Hook to use the context
export const useGlobalContext = (): GlobalContext => {
  const context = useContext(GlobalFlagContext);
  if (!context) {
    throw new Error('useGlobalFlag must be used within GlobalFlagProvider');
  }
  return context;
};

// Provider component
export const GlobalFlagProvider = ({
                                     children,
                                     value,
                                   }: {
  children: React.ReactNode;
  value: GlobalContext;
}) => {
  return (
    <GlobalFlagContext.Provider value={value}>
      {children}
    </GlobalFlagContext.Provider>
  );
};
