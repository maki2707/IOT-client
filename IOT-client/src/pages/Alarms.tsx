import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';

import { useGetAlarms } from '../hooks/useGetAlarms';
import { Alarm } from '../types/Alarm';
import { useSetAlarmAcknowledged } from '../hooks/useSetAlarmAcknowledged';
import { AlarmStatusEnum } from '../types/enums';

export const AlarmsPage = () => {
  const { data, isLoading, refetch, isRefetching } = useGetAlarms();
  const setAlarmAcknowledged = useSetAlarmAcknowledged();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

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
      onCell: record => ({
        style: {
          color:
            record.status === AlarmStatusEnum.ACTIVE_UNACK ||
            record.status === AlarmStatusEnum.CLEARED_UNACK
              ? 'red'
              : 'green',
          fontWeight: 700,
        },
      }),
    },
  ];

  const handleAcknowledge = async () => {
    await Promise.all(selectedRowKeys.map(alarmId => setAlarmAcknowledged(alarmId.toString())));
    await refetch();
    setSelectedRowKeys([]);
  };

  return (
    <>
      <div>
        <div className="login-text" style={{ marginBottom: '2rem' }}>
          List of your alarms
        </div>
        <Button
          type="primary"
          onClick={handleAcknowledge}
          disabled={!selectedRowKeys.length}
          loading={isLoading || isRefetching}
          style={{ marginBottom: 12 }}
        >
          Acknowledge
        </Button>
        <Table
          dataSource={data ?? []}
          rowKey={record => record.id.id}
          loading={isLoading || isRefetching}
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
            getCheckboxProps: record => ({
              disabled:
                record.status === AlarmStatusEnum.ACTIVE_ACK ||
                record.status === AlarmStatusEnum.CLEARED_ACK,
            }),
          }}
        />
      </div>
    </>
  );
};
