import { EntityTypeEnum } from '../enums';
import { Id } from './Id';

export type TenantId = Id & { entityType: EntityTypeEnum.TENANT };
