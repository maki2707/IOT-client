import { useContext, useState } from 'react';
import { Menu, MenuProps, Layout } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/userContext';
import { useLogout } from '../hooks/useLogout';

const { Content, Footer } = Layout;

interface NavbarsProps {
  children: React.ReactNode;
}

export const Navbars = ({ children }: NavbarsProps) => {
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)!;
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
    setUser({ token: '', refreshToken: '', name: '', customerId: '' });
  };

  const items: MenuProps['items'] = [
    {
      label: 'Smart flowers',
      key: 'home',
      icon: <HomeOutlined />,
      onClick: () => navigate('/'),
    },
    {
      label: 'My devices',
      key: 'devices',
      onClick: () => navigate('/devices'),
    },
    {
      label: 'My flowers',
      key: 'flowers',
      onClick: () => navigate('/flowers'),
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
      style: { marginLeft: 'auto' },
      onClick: () => handleLogout(),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex' }}>
      <Menu
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        onClick={e => setCurrent(e.key)}
        style={{
          borderBottom: '5px solid #1F51FF',
          paddingBottom: '1rem',
          paddingTop: '1rem',
          fontWeight: '800',
        }}
      />
      <Content style={{ padding: '2rem', flexGrow: 1 }}>{children}</Content>
      <Footer style={{ textAlign: 'center', width: '100%' }}>
        Made as a project for{' '}
        <span style={{ fontWeight: 700, color: '#1F51FF' }}>Internet of Things</span> course.
      </Footer>
    </Layout>
  );
};
