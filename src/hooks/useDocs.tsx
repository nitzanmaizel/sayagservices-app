import { useContext } from 'react';
import { DocsContext } from '../context/DocsContext';

const useDocs = () => {
  const context = useContext(DocsContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { useDocs };
