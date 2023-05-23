import React, { useContext, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { UserContext } from '../context/userContext';
import { Content } from 'antd/es/layout/layout';
import { useLogout } from '../hooks/useLogout';

interface NavbarsProps {
  children: React.ReactNode;
}

const Navbars: React.FC<NavbarsProps> = ({ children }) => {
  const [current, setCurrent] = useState('');
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    if (e.key === 'home') {
      navigate('/');
    } else if (e.key === 'logout') {
      handleLogout();
    }
  };

  const { user, setUser } = useContext(UserContext)!;
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

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

  const handleLogout = async () => {
    logout();
    setUser({ token: '', refreshToken:'', name: '' }); 
    navigate('/login');
  };

  if (!user.token) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{ borderBottom: '5px solid #1F51FF', paddingBottom: '1rem', fontWeight: '900' }}
      />
      <Content style={{ padding: '0 50px' }}>{children}</Content>
    </>
  );
};

export default Navbars;
