import { EntityTypeEnum } from '../enums';
import { Id } from './Id';

export type DeviceId = Id & { entityType: EntityTypeEnum.DEVICE };
