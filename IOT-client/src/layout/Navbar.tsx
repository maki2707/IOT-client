import { useContext, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserContext } from '../context/userContext';
import { useLogout } from '../hooks/useLogout';

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [current, setCurrent] = useState(() => pathname.slice(1) || 'home');
  const { setUser } = useContext(UserContext);
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
      label: 'My plants',
      key: 'plants',
      onClick: () => navigate('/plants'),
    },
    {
      label: 'My floor plan',
      key: 'floor-plan',
      onClick: () => navigate('/floor-plan'),
    },
    {
      label: 'My alarms',
      key: 'alarms',
      onClick: () => navigate('/alarms'),
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
  );
};
