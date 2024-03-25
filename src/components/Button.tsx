interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  label: string;
}
export default function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-fit rounded bg-q-blue/80 px-2 py-1 text-white transition-colors hover:bg-q-blue disabled:bg-q-blue-40"
    >
      {label}
    </button>
  );
}
