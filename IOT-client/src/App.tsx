import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';

import { UserContext } from './context/userContext';

import { Navbar } from './layout/Navbar';
import { AlarmsPage, Dashboard, FloorPlan, Login, MyDevices, MyFlowers } from './pages';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh', display: 'flex' }}>
        {user && user.token ? (
          <>
            <Navbar />
            <Content style={{ padding: '2rem', flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/devices" element={<MyDevices />} />
                <Route path="/plants" element={<MyFlowers />} />
                <Route path="/floor-plan" element={<FloorPlan />} />
                <Route path="/alarms" element={<AlarmsPage />} />
              </Routes>
            </Content>
          </>
        ) : (
          <>
            <Content style={{ padding: '2rem', flexGrow: 1 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Navigate to={'/login'} />} />
              </Routes>
            </Content>
          </>
        )}

        <Footer style={{ textAlign: 'center', width: '100%' }}>
          Made as a project for{' '}
          <span style={{ fontWeight: 700, color: '#1F51FF' }}>Internet of Things</span> course.
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
