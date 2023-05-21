import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Floorplan from './pages/Floorplan';
const queryClient = new QueryClient();
const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/' element={<Floorplan />} />
          </Routes>
        </Router>
      </QueryClientProvider>
  );
};

export default App;
