import { EntityTypeEnum } from '../enums';
import { Id } from './Id';

export type DeviceProfileId = Id & { entityType: EntityTypeEnum.DEVICE_PROFILE };
