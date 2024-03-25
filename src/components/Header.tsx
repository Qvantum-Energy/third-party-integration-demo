import QvantumLogo from '../assets/Qvantumlogo_white.svg';

export default function Header() {
  return (
    <header className="sticky top-0 flex w-full justify-between bg-q-blue p-4">
      <div className="flex items-center space-x-5">
        <img src={QvantumLogo} alt="Qvantum logo" width={40} />
        <div className="text-2xl uppercase text-white">QVANTUM</div>
      </div>
      <div className="text-3xl text-white">Integration API Test Client</div>
    </header>
  );
}
