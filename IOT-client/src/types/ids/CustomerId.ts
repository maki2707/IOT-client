import { EntityTypeEnum } from '../enums';
import { Id } from './Id';

export type CustomerId = Id & { entityType: EntityTypeEnum.CUSTOMER };
