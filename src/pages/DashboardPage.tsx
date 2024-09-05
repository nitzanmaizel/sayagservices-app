import React from 'react';
import PageWrapper from './PageWrapper';
import { useDocs } from '../hooks/useDocs';

const DashboardPage: React.FC = () => {
  const { recentDocs } = useDocs();

  if (recentDocs && recentDocs.length > 0) {
    return (
      <PageWrapper>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {recentDocs.map((doc) => (
            <div
              key={doc.id}
              style={{
                width: 'calc(33.33% - 16px)', // Set width to one-third minus gap
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              {doc.thumbnailLink && <img src={doc.thumbnailLink} alt={doc.name} loading='lazy' />}
              <div>{doc.name}</div>
            </div>
          ))}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>No documents found.</div> {/* Render a message if recentDocs is empty */}
    </PageWrapper>
  );
};

export default DashboardPage;
