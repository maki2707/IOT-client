import { EntityTypeEnum } from '../enums';
import { Id } from './Id';

export type OtaPackageId = Id & { entityType: EntityTypeEnum.OTA_PACKAGE };
