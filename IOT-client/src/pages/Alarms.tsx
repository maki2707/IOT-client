import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useGetAlarms } from '../hooks/useGetAlarms';
import { Alarm } from '../types/Alarm';

export const AlarmsPage = () => {
  const { data, isLoading } = useGetAlarms();

  const columns: ColumnsType<Alarm> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
    },
    {
      title: 'Originator name',
      dataIndex: 'originatorName',
      key: 'originatorName',
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
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <>
      <div>
        <div className="login-text" style={{ marginBottom: '2rem' }}>
          List of your alarms
        </div>
        <Table
          dataSource={data ?? []}
          rowKey={record => record.id.id}
          loading={isLoading}
          columns={columns}
        />
      </div>
    </>
  );
};
