export type Token = {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
};

export type Pump = {
  id: string;
  type: string;
  vendor: string;
  serial: string;
  model: string;
};

export type DevicesResponse = {
  user_id: string;
  devices: Pump[];
};

type Meta = {
  last_reported: string;
  validity: string;
  valid_until: string;
};

type Setting = {
  name: string;
  value: number | string;
  read_only: boolean;
};

export type PumpSettingsResponse = {
  meta: Meta;
  settings: Setting[];
};

export type APIError = {
  message: string;
};

export type TokenUser = {
  email: string;
  isQvantum: boolean;
  quid: string;
  firebase_id: string;
  tags: string[];
  you: string;
};
