import { CustomerId, DeviceProfileId, OtaPackageId, TenantId } from './ids';
import { DeviceId } from './ids/DeviceId';

export type DeviceData = {
  configuration: any;
  transportConfiguration: any;
};

export type Device = {
  id: DeviceId;
  createdTime?: number;
  tenantId?: TenantId;
  customerId?: CustomerId;
  name: string;
  type: string;
  label: string;
  deviceProfileId: DeviceProfileId;
  deviceData: DeviceData;
  firmwareId: OtaPackageId;
  softwareId: OtaPackageId;
  additionalInfo: any;
};
