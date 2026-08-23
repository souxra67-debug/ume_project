// src/pages/admin/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../services/api';

export default function LoginPage() {  // ✅ ត្រូវមាន export default
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await login(username, password);
      if (result.success) {
        navigate('/admin', { replace: true });
      } else {
        setError(result.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy-light/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl animate-pulse-gold"></div>
        
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block group">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/30 transition-colors"></div>
                <div className="relative w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-navy to-navy-light rounded-2xl flex items-center justify-center shadow-lg shadow-navy/50 group-hover:shadow-gold/30 transition-all duration-300 group-hover:scale-105">
                  <div className="text-center">
                    <span className="block text-gold text-2xl font-black leading-none">UME</span>
                    <span className="block text-white text-[10px] font-medium leading-none mt-0.5">ADMIN</span>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-extrabold text-white mt-2">
                <span className="text-gold">UME</span> Admin
              </h1>
            </Link>
            <p className="text-gray-400 mt-3 text-sm">
              <i className="bi bi-shield-lock mr-1"></i>
              Secure access to your content management system
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-light rounded-full"></div>
                <h2 className="text-xl font-bold text-white">Sign In</h2>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-5 text-sm flex items-start gap-3 animate-fade-in backdrop-blur-sm">
                  <i className="bi bi-exclamation-triangle-fill mt-0.5 shrink-0"></i>
                  <div>
                    <p className="font-medium">Login Error</p>
                    <p className="text-red-400/80 text-xs mt-0.5">{error}</p>
                  </div>
                  <button 
                    onClick={() => setError('')}
                    className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <i className="bi bi-person mr-1.5 text-gold"></i>
                    Username
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="bi bi-person text-gray-500 group-focus-within/input:text-gold transition-colors"></i>
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={e => {
                        setUsername(e.target.value);
                        setError('');
                      }}
                      required
                      placeholder="Enter your username"
                      autoComplete="username"
                      autoFocus
                      className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold/50 text-white placeholder-gray-500 transition-all duration-200 hover:border-white/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <i className="bi bi-lock mr-1.5 text-gold"></i>
                    Password
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="bi bi-lock text-gray-500 group-focus-within/input:text-gold transition-colors"></i>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      required
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full pl-10 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold/50 text-white placeholder-gray-500 transition-all duration-200 hover:border-white/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-400 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-500 bg-white/5 text-gold focus:ring-gold/50 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="group-hover:text-gray-300 transition-colors">Remember me</span>
                  </label>
                  <button 
                    type="button"
                    className="text-gray-400 hover:text-gold transition-colors"
                    onClick={() => alert('Please contact your administrator to reset your password.')}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-gold to-gold-light text-navy px-6 py-3.5 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
                      <span className="relative">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right text-lg group-hover:translate-x-1 transition-transform"></i>
                      <span className="relative">Sign In</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <span className="text-xs text-gray-500 font-medium">SECURE LOGIN</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              <div className="mt-6 text-center">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-all duration-200 group"
                >
                  <i className="bi bi-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                  <span>Back to website</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <i className="bi bi-shield-check text-green-500"></i>
                Encrypted
              </span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span>© {new Date().getFullYear()} UME</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  // ✅ បញ្ចប់ function ត្រឹមត្រូវ