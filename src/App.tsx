import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/Dashboard/Dashboard';
import CreateDocPage from './pages/Dashboard/Create/CreateDocPage';
import RecentDocsPage from './pages/Dashboard/RecentDocs/RecentDocsPage';
import PageWrapper from './pages/PageWrapper';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<PageWrapper>About Page</PageWrapper>} />
      <Route path='/create' element={<CreateDocPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/recent' element={<RecentDocsPage />} />
    </Routes>
  );
};

export default App;
