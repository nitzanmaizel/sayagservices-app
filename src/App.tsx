import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreateDocPage from './pages/CreateDocPage';
import RecentDocsPage from './pages/RecentDocsPage';
import PageWrapper from './pages/PageWrapper';
import DashboardPage from './pages/Dashboard';
import SearchDocPage from './pages/SearchDocPage';
import NewDocPage from './pages/NewDocPage';
import ErrorPage from './pages/ErrorPage';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import LoadingAppPage from './pages/LoadingAppPage';

import ProtectedRoute from './components/ProtectedRoute';
import { useUser } from './hooks/useUser';

const App = () => {
  const { loading } = useUser();

  if (loading) {
    return <LoadingAppPage />;
  }

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/error' element={<ErrorPage />} />
      <Route path='/about' element={<PageWrapper>About Page</PageWrapper>} />
      <Route path='/products' element={<ProductsPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/create' element={<CreateDocPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/recent' element={<RecentDocsPage />} />
        <Route path='/search' element={<SearchDocPage />} />
        <Route path='/new' element={<NewDocPage />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
