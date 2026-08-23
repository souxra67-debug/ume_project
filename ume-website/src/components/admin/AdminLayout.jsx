import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { path: '/admin', icon: 'bi-speedometer2', label: 'Dashboard', exact: true },
  { path: '/admin/banners', icon: 'bi-image', label: 'Hero Banners' },
  { path: '/admin/news', icon: 'bi-newspaper', label: 'News' },
  { path: '/admin/events', icon: 'bi-calendar-event', label: 'Events' },
  { path: '/admin/categories', icon: 'bi-tags', label: 'Categories' },
  { path: '/admin/gallery', icon: 'bi-collection', label: 'Gallery' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-navy dark:bg-gray-800 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10">
          <Link to="/admin" className="text-2xl font-extrabold text-gold">UME Admin</Link>
          <p className="text-white/40 text-xs mt-1">Content Management</p>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-gold/20 text-gold font-semibold' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/5 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-sm">
              {user?.username?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.username || 'Admin'}</p>
              <p className="text-white/40 text-xs">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/10 transition-colors">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
          <Link to="/" className="flex items-center gap-2 w-full px-4 py-3 mt-1 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors text-sm">
            <i className="bi bi-arrow-left"></i> Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 md:px-8 h-16">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <i className="bi bi-list text-xl"></i>
            </button>
            <div className="flex items-center gap-4 ml-auto">
              <Link to="/" className="text-sm text-gray-500 hover:text-gold transition-colors">
                View Site <i className="bi bi-box-arrow-up-right ml-1"></i>
              </Link>
            </div>
          </div>
        </header>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}