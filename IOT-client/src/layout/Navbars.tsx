import React, { useContext, useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { UserContext } from '../context/userContext';
import { Layout } from 'antd';
import { useLogout } from '../hooks/useLogout';

const { Content, Footer } = Layout;

interface NavbarsProps {
  children: React.ReactNode;
}

const Navbars: React.FC<NavbarsProps> = ({ children }) => {
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)!;
  const { mutate: logout } = useLogout();
  const handleLogout = async () => {
    logout();
    setUser({ token: '', refreshToken:'', name: '', customerId: '' }); 
    navigate('/login');
  };

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    if (e.key === 'home') {
      navigate('/');
    } else if (e.key === 'logout') {
      handleLogout();
    } else if (e.key === 'devices') {
      navigate('/devices');
    } else if (e.key === 'flowers') {
      navigate('/flowers');
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Smart flowers',
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: 'MY DEVICES',
      key: 'devices',
    },
    {
      label: 'MY FLOWERS',
      key: 'flowers',
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
      style: { marginLeft: 'auto' },
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{ borderBottom: '5px solid #1F51FF', paddingBottom: '1rem', fontWeight: '900', height: '8vh' }}
      />
      <Content style={{ padding: '5vh', minHeight: '85vh' }}>{children}</Content>
      <Footer style={{ textAlign: 'center', padding: '0', position: 'fixed', bottom: '0', width: '100%' }}>
        Image by pch.vector on Freepik
      </Footer>
    </Layout>
  );
};

export default Navbars;
