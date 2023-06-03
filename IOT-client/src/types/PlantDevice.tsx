export type PlantDevice = {
    id: {
      entityType: string;
      id: string;
    };
    createdTime: number;
    additionalInfo: {
      gateway: boolean;
      overwriteActivityTime: boolean;
      description: string;
    };
    tenantId: {
      entityType: string;
      id: string;
    };
    customerId: {
      entityType: string;
      id: string;
    };
    name: string;
    type: string;
    label: string;
    deviceProfileId: {
      entityType: string;
      id: string;
    };
    deviceData: {
      configuration: {
        type: string;
      };
      transportConfiguration: {
        type: string;
      };
    };
    firmwareId: null;
    softwareId: null;
    externalId: null;
  };
  