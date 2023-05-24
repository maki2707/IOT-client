import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { UserContext } from './context/userContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { MyDevices } from './pages/MyDevices';
import { Navbars } from './layout/Navbars';
import MyFlowers from './pages/MyFlowers';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        {user && user.token ? (
          <>
            <Route
              path="/"
              element={
                <Navbars>
                  <Dashboard />
                </Navbars>
              }
            />
            <Route
              path="/devices"
              element={
                <Navbars>
                  <MyDevices />
                </Navbars>
              }
            />
            <Route
              path="/flowers"
              element={
                <Navbars>
                  <MyFlowers />
                </Navbars>
              }
            />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to={'/login'} />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
