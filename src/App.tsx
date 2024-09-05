import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<div>About Page</div>} />
      <Route path='/dashboard' element={<DashboardPage />} />
    </Routes>
  );
};

export default App;
