import { EntityTypeEnum } from '../enums';
import { Id } from './Id';

export type AlarmId = Id & { entityType: EntityTypeEnum.ALARM };
