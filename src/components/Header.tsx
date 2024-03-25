import QvantumLogo from "../assets/Qvantumlogo_white.svg";

export default function Header() {
  return (
    <header className="p-4 flex justify-between w-full bg-q-blue sticky top-0">
      <div className="flex space-x-5 items-center">
        <img src={QvantumLogo} alt="Qvantum logo" width={40} />
        <div className="text-white uppercase text-2xl">QVANTUM</div>
      </div>
      <div className="text-white text-3xl">Integration API Test Client</div>
    </header>
  );
}
