import { Table } from 'antd';

import useGetDevices from '../hooks/useGetDevices';

export const MyDevices = () => {
  const { data, isLoading } = useGetDevices();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Description',
      dataIndex: ['additionalInfo', 'description'],
      key: 'additionalInfo.description',
    },

    {
      title: 'Created Time',
      dataIndex: 'createdTime',
      key: 'createdTime',
      render: (createdTime: number) => {
        const date = new Date(createdTime);

        return date.toLocaleString();
      },
    },
  ];

  return (
    <>
      <div>
        <div className="login-text" style={{ marginBottom: '2rem' }}>
          List of your devices
        </div>
        <Table
          dataSource={data}
          rowKey={record => record.id.id}
          loading={isLoading}
          columns={columns}
        />
      </div>
    </>
  );
};
