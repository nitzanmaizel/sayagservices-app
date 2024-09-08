import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateDocPage from './pages/CreateDocPage';
import RecentDocsPage from './pages/RecentDocsPage';
import PageWrapper from './pages/PageWrapper';
import DashboardPage from './pages/Dashboard';
import SearchDocPage from './pages/SearchDocPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<PageWrapper>About Page</PageWrapper>} />
      <Route path='/create' element={<CreateDocPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/recent' element={<RecentDocsPage />} />
      <Route path='/search' element={<SearchDocPage />} />
    </Routes>
  );
};

export default App;
