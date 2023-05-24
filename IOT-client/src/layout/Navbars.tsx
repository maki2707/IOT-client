import React, { useContext, useState } from 'react';
import { Menu, } from 'antd';
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
