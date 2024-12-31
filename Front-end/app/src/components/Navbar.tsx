import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4">
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-white">Welcome, {user.name}</span>
          <span className="text-gray-400">({user.email})</span>
          {user.roles?.includes('ADMIN') && (
            <span className="bg-blue-500 px-2 py-1 rounded text-sm">Admin</span>
          )}
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        // ... login buttons ...
      )}
    </nav>
  );
}; 