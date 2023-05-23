import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import useGetUser from '../hooks/useGetUser';
import queryClient from '../util/queryClients';

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext)!;
  const navigate = useNavigate();
  const { data: userData } = useGetUser();
  
  if(user.name === '')
  {
    queryClient.invalidateQueries(userData)
  }

  if (!user.token) {
    navigate('/');
    return null;
  }

  return (
    <>
      {userData && (
        <>
          <div className="login-text">Hi, {userData.firstName}! Welcome back!</div>
        </>
      )}
    </>
  );
};

export default Dashboard;
