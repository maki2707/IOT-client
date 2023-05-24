import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import useGetDevices from '../hooks/useGetDevices';
import { Table } from 'antd';

const MyDevices: React.FC = () => {
  const { user } = useContext(UserContext)!;
  const navigate = useNavigate();
  const { data: devicesData, refetch: refetchDevices } = useGetDevices();

  useEffect(() => {
    if (user.token === '') {
      console.log(user);
      console.log('nekaj');
      navigate('/login');
      return;
    }
    if(localStorage.getItem("customerId") !== '')
    refetchDevices();
  }, [user, navigate, refetchDevices]);

  const columns = [
    
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    
    {
      title: "Label",
      dataIndex: "label",
      key: "label"
    },
    {
        title: 'Description',
        dataIndex: ['additionalInfo', 'description'],
        key: 'additionalInfo.description',
      },
      
    {
      title: "Created Time",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (createdTime: number) => {
        const date = new Date(createdTime);
        return date.toLocaleString(); 
      }
    },
  ];

  return (
    <>
        <div style={{marginTop: '2rem'}}>
            <div className="login-text">List of your devices</div>
            <Table dataSource={devicesData} columns={columns} />
        </div>
    </>
  );
};

export default MyDevices;
