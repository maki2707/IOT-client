import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { UserProvider } from './context/userContext';
import Navbars from './layout/Navbars';
import MyDevices from './pages/MyDevices';
import MyFlowers from './pages/MyFlowers';
import Floorplan from './pages/Floorplan';

const queryClient = new QueryClient();

const App = () => {

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
              <Route path="/" element={<Navbars><Dashboard /></Navbars>} />
              <Route path="/devices" element={<Navbars><MyDevices /></Navbars>} />
              <Route path="/flowers" element={<Navbars><MyFlowers /></Navbars>} />
              <Route path="/login" element={<Login />} />
              <Route path="/floorplan" element={<Navbars><Floorplan /></Navbars>} />
            </Routes>
        </Router>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
