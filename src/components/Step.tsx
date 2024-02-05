import { PropsWithChildren } from "react";

const StepHeader = ({ children }: PropsWithChildren) => {
  return <h1 className="text-2xl pb-2">{children}</h1>;
};

const StepBody = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid gap-4 bg-q-black-20 rounded-md p-4">
      <span className="font-normal text-q-blue">Response</span>
      <div className="ml-2">{children}</div>
    </div>
  );
};

const Step = {
  Header: StepHeader,
  Body: StepBody,
};

export default Step;
