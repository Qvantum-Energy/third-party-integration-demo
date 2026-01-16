import { DevicesResponse, APIError, Pump, PumpSettingsResponse, Token, TokenUser } from './interfaces';

const API_HOST = import.meta.env.PROD ? 'https://api.qvantum.com' : '';

const fetchTokenUser = async (token: Token) => {
  try {
    const response = await fetch(`${API_HOST}/api/auth/v1/whoami`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    if (response.ok) {
      return (await response.json()) as TokenUser;
    }
    return (await response.json()) as APIError;
  } catch (e) {
    console.log(e);
  }
};

const fetchOathToken = async (clientId: string, code: string): Promise<Token | APIError | undefined> => {
  try {
    const response = await fetch(`${API_HOST}/api/auth/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `client_id=${clientId}&grant_type=authorization_code&code=${code}`,
    });

    if (response.ok) {
      return (await response.json()) as Token;
    }
    return (await response.json()) as APIError;
  } catch (e) {
    console.log(e);
  }
};

const fetchUserPumps = async (token: Token, userId: string): Promise<Pump[] | APIError | undefined> => {
  try {
    const response = await fetch(`${API_HOST}/api/inventory/v1/users/${userId}/devices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.access_token}`,
      },
    });

    if (response.ok) {
      const res = (await response.json()) as DevicesResponse;
      return res.devices;
    }
    return (await response.json()) as APIError;
  } catch (error) {
    console.log(error);
  }
};

const fetchPumpSettings = async (
  token: Token,
  deviceId: string
): Promise<PumpSettingsResponse | APIError | undefined> => {
  try {
    const response = await fetch(`${API_HOST}/api/device-info/v1/devices/${deviceId}/settings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.access_token}`,
      },
    });

    if (response.ok) {
      return (await response.json()) as PumpSettingsResponse;
    }
    return (await response.json()) as APIError;
  } catch (error) {
    console.log(error);
  }
};

export const apiService = {
  fetchTokenUser,
  fetchOathToken,
  fetchUserPumps,
  fetchPumpSettings,
};
