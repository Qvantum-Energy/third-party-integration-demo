import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Root() {
  return (
    <div className="flex flex-col bg-q-black-20 min-h-screen">
      <Header />
      <main className="flex grow justify-center items-center py-10">
        <div className="container p-10 rounded-md shadow-lg bg-white">
          <div className="grid gap-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
