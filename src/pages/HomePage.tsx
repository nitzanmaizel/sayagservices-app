import React from 'react';
import { useUser } from '../hooks/useUser';
import PageWrapper from './PageWrapper';
import CreateDocument from '../components/CreateDoc/CreateDocument';

const HomePage: React.FC = () => {
  const { userInfo } = useUser();

  return (
    <PageWrapper>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', fontSize: '40px' }}>
          <h1>Sayag Services</h1>
        </div>
        {userInfo && <CreateDocument />}
      </div>
    </PageWrapper>
  );
};

export default HomePage;
