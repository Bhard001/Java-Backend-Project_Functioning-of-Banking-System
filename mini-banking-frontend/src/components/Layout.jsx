// ...existing code...
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout, token } = useAuth(); // include token or rely on user

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">MiniBank</Link>
          <div>
            {token ? (
              <>
                <Link to="/transactions" className="mr-4 text-gray-700 hover:text-gray-900">Transactions</Link>
                <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-blue-500 text-white px-3 py-1 rounded">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
// ...existing code...