import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

export default function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    history.push('/login');
  };

  return (
    <nav className="bg-white shadow mb-4">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold hover:text-blue-500">
          Twitter Clone
        </Link>
        <div>
          {token ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Çıkış
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="mr-4 hover:underline text-gray-700 hover:text-blue-500"
              >
                Giriş
              </Link>
              <Link
                to="/register"
                className="hover:underline text-gray-700 hover:text-green-500"
              >
                Kayıt
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}