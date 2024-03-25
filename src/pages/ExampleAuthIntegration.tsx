import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import Step from "../components/Step";
import Button from "../components/Button";
import { APIError, Pump, PumpSettingsResponse, Token } from "../interfaces";
import { apiService } from "../api";
import { constants } from "../constants";





export default function ExampleAuthIntegration() {
  const location = useLocation();
  const navigate = useNavigate();
  const [URLSearchParams] = useSearchParams();
  const [clientId, setClientId] = useState<string>(constants.CLIENT_ID);
  const [userId, setUserId] = useState<string>("");
  const [code, setCode] = useState<string | null>(null);

  const [token, setToken] = useState<Token | null>(null);
  const [pumpData, setPumpData] = useState<Pump[] | null>(null);
  const [settings, setSettings] = useState<PumpSettingsResponse | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.search) {
      const code = URLSearchParams.get("code");
      if (code) {
        setCode(code);
      }
    }
  }, [URLSearchParams, location.search]);

  const redirectToAccountSite = () => {
    window.location.replace(
      `${constants.QACCOUNT_URL}/authorize?client_id=${clientId}&redirect_uri=${constants.REDIRECT_URI}&state=${constants.STATE}`
    );
  };

  const handleApiResponse = async <T,>(
    apiCall: Promise<T | APIError | undefined>,
    successCallback: (data: T) => void
  ): Promise<void> => {
    setError(null);
    const response = await apiCall;
    if (response) {
      if (typeof response === "object" && "message" in response) {
        setError((response as APIError).message);
      } else {
        successCallback(response as T);
      }
    }
  };

  const getOathToken = () => {
    handleApiResponse(
      apiService.fetchOathToken(clientId, code ?? ""),
      setToken,
    );
  };

  const getAllUserPumps = () => {
    if (!token || !userId) return;
    handleApiResponse(
      apiService.fetchUserPumps(token, userId),
      setPumpData
    );
  };

  const getSettingsForDevice = () => {
    if (!token || !selectedDeviceId) return;
    handleApiResponse(
      apiService.fetchPumpSettings(token, selectedDeviceId),
      setSettings
    );
  };

  // add toast notification if error occurs
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-normal underline decoration-q-red text-q-blue">
        Add Example Integration to User and Fetch Pump Data
      </h1>

      <section>
        <div className="flex gap-4 mb-2 items-center">
          <Step.Header>Step 1: fetch authorization code</Step.Header>
          <Button label="Request code" onClick={redirectToAccountSite} />
        </div>
        <div className="grid gap-2 mb-2">
          Redirect to Qvantum Account website with the following URL search
          parameters:
          <div className="ml-4">
            <div>
              <label>
                - client_id: &nbsp;
                <input type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} className="border border-q-blue-60 rounded px-2" />
              </label>
              <span className="text-q-red ml-2">(provided by Qvantum)</span>
            </div>
            <div>
              {`- redirect_uri: ${constants.REDIRECT_URI}`}{" "}
              <span className="text-q-red">
                (needs to be verified by Qvantum)
              </span>
            </div>
            <div>{`- state: ${constants.STATE}`}</div>
            <div />
          </div>
          <div>{`Complete redirect url: ${constants.QACCOUNT_URL}/authorize?client_id=${clientId}&redirect_uri=${constants.REDIRECT_URI}&state=${constants.STATE}`}</div>
        </div>
        {location.search && <Step.Body>{window.location.href}</Step.Body>}
      </section>

      <section>
        <div className="flex gap-4 mb-2 items-center">
          <Step.Header>Step 2: fetch OAuth token</Step.Header>
          <Button
            label="Request token"
            onClick={getOathToken}
            disabled={!code}
          />
        </div>
        {token && (
          <Step.Body>
            {"{"}
            <div className="flex flex-col gap-6 w-1/2 ml-10">
              <div className="flex gap-2">
                <span className="">access_token: </span>
                <span className="break-words max-w-md lg:max-w-3xl">
                  "{token.access_token}"
                </span>
              </div>
              <div className="flex gap-2">
                <span>refresh_token: </span>
                <span className="break-words max-w-md lg:max-w-3xl">
                  "{token.refresh_token}"
                </span>
              </div>
              <div className="flex gap-2">
                <span>token_type: </span>
                <span>"{token.token_type}"</span>
              </div>
              <div className="flex gap-2">
                <span>expires_in: </span>
                <span>"{token.expires_in}"</span>
              </div>
            </div>
            {"}"}
          </Step.Body>
        )}
      </section>

      <section>
        <div className="flex gap-4 mb-2 items-center">

          <Step.Header>
            Step 3: Get all pumps for the user
          </Step.Header>
          <Button
            label="Fetch pump data"
            onClick={getAllUserPumps}
            disabled={!code || !token || !userId}
          />
        </div>
        <div>
          <label>
            Enter userId: &nbsp;
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} className="border border-q-blue-60 rounded px-2" />
          </label>
          <span className="text-q-red ml-2">
            (same as the one used to sign in to Qvantum Account)
          </span>
        </div>
        {pumpData && (
          <Step.Body>
            {'{'}
            <div className="ml-10">
              "user_id": "{userId}",
              <div>
                "devices": [
                <div className="ml-10">
                  {pumpData.map((pump) => (
                    <div key={pump.serial}>
                      {"{"}
                      <div className="ml-10">
                        <div>{`id: ${pump.id}`},</div>
                        <div>{`type: ${pump.type}`},</div>
                        <div>{`vendor: ${pump.vendor}`},</div>
                        <div>{`serial: ${pump.serial ?? "-"},`}</div>
                        <div>{`model: ${pump.model},`}</div>
                      </div>
                      {"},"}
                    </div>
                  ))}
                </div>
                ]
              </div>
            </div>
            {'}'}
          </Step.Body>
        )}
      </section>

      <section>
        <div className="flex gap-4 mb-2 items-center">
          <Step.Header>
            Extra: Once you have a device id you can fetch settings for that device
          </Step.Header>
          <Button
            label={`Fetch settings for ${selectedDeviceId}`}
            onClick={() => getSettingsForDevice()}
            disabled={!code || !token || !selectedDeviceId}
          />
        </div>
        <div>
          <label htmlFor="device_id">Select device:</label>
          <select
            id="device_id"
            className="p-2"
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            defaultValue={"disabled"}
          >
            <option disabled value="disabled">Select device</option>
            {pumpData?.map((pump) => (
              <option key={pump.id} value={pump.id}>
                {pump.serial}
              </option>
            ))}
          </select>
        </div>

        {settings && (<Step.Body>
          {'{'}
          <div className="ml-10">
            "meta": {"{"}
            <div className="ml-10">
              <div>{`last_reported: ${settings?.meta.last_reported}`},</div>
              <div>{`validity: ${settings?.meta.validity}`},</div>
              <div>{`valid_until: ${settings?.meta.valid_until}`},</div>
            </div>
            {"},"}
            <div>
              "settings": [
              <div className="ml-10">
                {settings?.settings.map((setting) => (
                  <div key={setting.name}>
                    {"{"}
                    <div className="ml-10">
                      <div>{`name: ${setting.name}`},</div>
                      <div>{`value: ${setting.value}`},</div>
                      <div>{`read_only: ${setting.read_only}`},</div>
                    </div>
                    {"},"}
                  </div>
                ))}
              </div>
              ]
            </div>
          </div>
          {'}'}
        </Step.Body>)}
      </section>

      <Button
        label="Clear"
        onClick={() => {
          setCode(null);
          setToken(null);
          setPumpData(null);
          setSettings(null);
          setError(null);
          navigate("/", { replace: true });
        }}
      />
      <Toaster position="bottom-center" />
    </div>
  );
}
