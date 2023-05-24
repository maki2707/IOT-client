import { AlarmSeverityEnum, AlarmStatusEnum, EntityTypeEnum } from './enums';
import { AlarmId, CustomerId, Id, TenantId } from './ids';

export type Originator = Id & {
  entityType: EntityTypeEnum;
};

export type Alarm = {
  name: string;
  type: string;
  originator: Originator;
  severity: AlarmSeverityEnum;
  status: AlarmStatusEnum;
  id: AlarmId;
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
