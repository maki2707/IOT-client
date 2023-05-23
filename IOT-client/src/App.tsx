import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route, Navigate, RouteProps, useNavigate } from 'react-router-dom';
import './index.css';
import Floorplan from './pages/Floorplan';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { UserProvider, UserContext } from './context/userContext';
import { useContext } from 'react';
import Navbars from './layout/Navbars';

const queryClient = new QueryClient();

// Custom wrapper component to check authentication
const ProtectedRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
  const { user } = useContext(UserContext)!;
  const navigate = useNavigate();
    console.log(user)
    if (!user.token) {
      navigate('/login');
      return null;
    }

  return <Route {...rest} element={element} />;
};

const App = () => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navbars><Dashboard /></Navbars>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
