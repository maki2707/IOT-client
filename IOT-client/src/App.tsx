import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Floorplan from './pages/Floorplan';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { UserProvider, UserContext } from './context/userContext';
import { useContext } from 'react';
import Navbars from './layout/Navbars';

const queryClient = new QueryClient();

const App = () => {
  const userContext = useContext(UserContext);

  const { user } = userContext!;


  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
              <Route path="/" element={<Navbars><Dashboard /></Navbars>} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
