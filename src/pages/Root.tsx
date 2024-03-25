import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function Root() {
  return (
    <div className="flex min-h-screen flex-col bg-q-black-20">
      <Header />
      <main className="flex grow items-center justify-center py-10">
        <div className="container rounded-md bg-white p-10 shadow-lg">
          <div className="grid gap-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
