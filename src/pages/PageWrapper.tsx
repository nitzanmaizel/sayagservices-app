import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Sayag Services</p>
      </footer>
    </div>
  );
};

export default PageWrapper;
