import { useContext } from 'react';
import { DocsContext } from '../context/DocsContext';

const useDocs = () => {
  const context = useContext(DocsContext);
  if (context === undefined) {
    throw new Error('useDocs must be used within a DocsProvider');
  }
  return context;
};

export { useDocs };
