interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  label: string;
}
export default function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="bg-q-blue/80 rounded text-white py-1 px-2 hover:bg-q-blue transition-colors w-fit disabled:bg-q-blue-40"
    >
      {label}
    </button>
  );
}
