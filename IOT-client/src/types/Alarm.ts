import { AlarmSeverityEnum, AlarmStatusEnum, EntityTypeEnum } from './enums';

type Id = { id: string };
export type AlarmId = Id & { entityType: EntityTypeEnum.ALARM };
export type TenantId = Id & { entityType: EntityTypeEnum.TENANT };
export type CustomerId = Id & { entityType: EntityTypeEnum.CUSTOMER };
export type Originator = Id & {
  entityType: EntityTypeEnum;
};

export type Alarm = {
  name: string;
  type: string;
  originator: Originator;
  severity: AlarmSeverityEnum;
  status: AlarmStatusEnum;
  id?: AlarmId;
  createdTime?: number;
  tenantId?: TenantId;
  customerId?: CustomerId;
  startTs: number;
  endTs: number;
  ackTS: number;
  clearTs: number;
  details: any;
  propagate: boolean;
  propagateToOwner: boolean;
  propagateToTenant: boolean;
  originatorName: string;
};
