import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash, FaShieldAlt, FaUserShield } from 'react-icons/fa';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import './Login.css';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('dessu@gmail.com');
  const [password, setPassword] = useState('dessu123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validate identifier - only allow letters, numbers, @, ., _, and -
  const validateIdentifier = (value) => {
    // Allow alphanumeric, @, ., _, and - for email/username
    const regex = /^[a-zA-Z0-9@._-]*$/;
    return regex.test(value);
  };

  const handleIdentifierChange = (e) => {
    const value = e.target.value;
    // Only update if valid or empty
    if (value === '' || validateIdentifier(value)) {
      setIdentifier(value);
      // Clear error when user starts typing
      if (error) setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Additional validation before submission
    if (!identifier.trim()) {
      setError('Please enter your email or username.');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/auth/login', {
        email: identifier.trim(),
        password: password.trim(),
      });

      if (res.data && res.data.token) {
        const currentUser = res.data.admin || res.data.user || null;
        login(res.data.token, rememberMe, currentUser);
        navigate('/dashboard');
      } else {
        setError('Invalid server response. Please try again.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Login failed. Please check your credentials.');
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('Please contact the portfolio owner to reset your password.');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <>
      <Navbar brand="Portfolio" />
      <main className="login-page">
        <div className="login-container">
          <div className="login-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-circle small"></div>
            <div className="decoration-circle medium"></div>
          </div>
          
          <div className="login-panel glass-card">
            <div className="login-header">
              <div className="login-icon-wrapper">
                <FaShieldAlt className="login-icon" />
              </div>
              <span className="login-badge">Admin Access</span>
              <h1>Welcome Back</h1>
              <p className="login-subtitle">
                Sign in to your admin dashboard to manage your portfolio
              </p>
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="identifier">
                  <FaEnvelope className="input-icon" />
                  Email or Username
                </label>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={handleIdentifierChange}
                  onKeyPress={handleKeyPress}
                  placeholder="dessu@gmail.com"
                  required
                  autoComplete="username"
                  className="login-input"
                  disabled={loading}
                  spellCheck="false"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <FaLock className="input-icon" />
                  Password
                </label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="login-input"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="forgot-link"
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  Forgot Password?
                </button>
              </div>

              {error && (
                <div className="form-error" role="alert">
                  <FaSignInAlt className="error-icon" />
                  <span>{error}</span>
                </div>
              )}

              <button 
                className="btn btn-primary" 
                type="submit" 
                disabled={loading}
                onClick={(e) => {
                  if (!loading) {
                    handleSubmit(e);
                  }
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    Sign In
                  </>
                )}
              </button>

              <div className="login-footer">
                <FaUserShield className="footer-icon" />
                <span>Secure admin authentication</span>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}