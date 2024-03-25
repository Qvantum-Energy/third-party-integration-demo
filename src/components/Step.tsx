import { PropsWithChildren } from 'react';

const StepHeader = ({ children }: PropsWithChildren) => {
  return <h1 className="pb-2 text-2xl">{children}</h1>;
};

const StepBody = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid gap-4 rounded-md bg-q-black-20 p-4">
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
