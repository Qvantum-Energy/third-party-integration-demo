import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import Step from "../components/Step";
import Button from "../components/Button";

const CLIENT_ID = "fulBevB7HBSeYF7xNOqi";
const REDIRECT_URI = "http://localhost:5173";
const STATE = "abc123";

const QACCOUNT_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : import.meta.env.VITE_QACCOUNT_URL;

type Token = {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
};

type Pump = {
  serial: string;
  productName: string;
};

export default function ExampleAuthIntegration() {
  const location = useLocation();
  const navigate = useNavigate();
  const [URLSearchParams] = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [token, setToken] = useState<Token | null>(null);
  const [pumpData, setPumpData] = useState<Pump[] | null>(null);

  useEffect(() => {
    if (location.search) {
      const code = URLSearchParams.get("code");
      if (code) {
        setCode(code);
      }
    }
  }, [URLSearchParams, location.search]);

  const fetchAuthorizationCode = () => {
    window.location.replace(
      `${QACCOUNT_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`
    );
  };

  const fetchOathToken = async () => {
    try {
      const response = await fetch("/api/auth/v1/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `client_id=${CLIENT_ID}&grant_type=authorization_code&code=${code}`,
      });

      if (response.ok) {
        const res = await response.json();
        setToken(res);
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPumpData = async () => {
    try {
      const response = await fetch("/api/inventory/v0/user-heatpumps", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.access_token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        setPumpData(res);
      } else {
        throw Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-normal underline decoration-q-red text-q-blue">
        Add Example Integration to User and Fetch Pump Data
      </h1>

      <section>
        <div className="flex gap-4 mb-2 items-center">
          <Step.Header>Step 1: fetch authorization code</Step.Header>
          <Button label="Request code" onClick={fetchAuthorizationCode} />
        </div>
        <div className="grid gap-2 mb-2">
          Redirect to Qvantum Account website with the following URL search
          parameters:
          <div className="ml-4">
            <div>
              {`- client_id: ${CLIENT_ID}`}{" "}
              <span className="text-q-red">(provided by Qvantum)</span>
            </div>
            <div>
              {`- redirect_uri: ${REDIRECT_URI}`}{" "}
              <span className="text-q-red">
                (needs to be verified by Qvantum)
              </span>
            </div>
            <div>{`- state: ${STATE}`}</div>
            <div />
          </div>
          <div>{`Complete redirect url: ${QACCOUNT_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`}</div>
        </div>
        {location.search && <Step.Body>{window.location.href}</Step.Body>}
      </section>

      <section>
        <div className="flex gap-4 mb-2 items-center">
          <Step.Header>Step 2: fetch OAuth token</Step.Header>
          <Button
            label="Request token"
            onClick={fetchOathToken}
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
            Step 3: use fetched token to access heat pump data
          </Step.Header>
          <Button
            label="Fetch pump data"
            onClick={fetchPumpData}
            disabled={!code || !token}
          />
        </div>
        {pumpData && (
          <Step.Body>
            [
            <div className="ml-10">
              {pumpData.map((pump) => (
                <div key={pump.serial}>
                  {"{"}
                  <div className="ml-10">
                    <div>{`productName: ${pump.productName}`},</div>
                    <div>{`serial: ${pump.serial ?? "-"},`}</div>
                  </div>
                  {"},"}
                </div>
              ))}
            </div>
            ]
          </Step.Body>
        )}
      </section>

      <Button
        label="Clear"
        onClick={() => {
          setCode(null);
          setToken(null);
          setPumpData(null);
          navigate("/", { replace: true });
        }}
      />
    </div>
  );
}
