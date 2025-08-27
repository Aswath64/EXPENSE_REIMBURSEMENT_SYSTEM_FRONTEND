import React, { useContext, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { loginApi } from '../../api/authApi';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [commonError, setCommonError] = useState('');

  const validate = () => {
    const newError = {};

    if (!username.trim()) newError.username = 'Username is required';
    if (!password.trim()) newError.password = 'Password is required';

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handle = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const data = await loginApi(username, password);
      const user = { username: data.username, role: data.role };
      login(user, data.token);

      if (user.role === 'APPLICANT') navigate('/applicant/dashboard');
      else if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/agent/dashboard');
    } catch (err) {
      console.error(err);
      setCommonError('Invalid username or password');
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: 'calc(100vh - 70px)',
          background: 'linear-gradient(120deg, #ffffff, #b5b0b0)',
          padding: '20px'
        }}
      >
        <Card className="shadow-lg rounded-4 p-4" style={{ maxWidth: 400, width: '100%' }}>
          <h3 className="fw-bold mb-4 text-center text-primary">Login</h3>

          {commonError && (
            <div className="alert alert-danger text-center p-2 rounded-3">
              {commonError}
            </div>
          )}

          <Form onSubmit={handle}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (commonError) setCommonError('');
                  if (error.username) setError({ ...error, username: '' });
                }}
                className="shadow-sm rounded-pill px-3 py-2"
              />
              {error.username && <div className="text-danger mt-1">{error.username}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (commonError) setCommonError('');
                  if (error.password) setError({ ...error, password: '' });
                }}
                className="shadow-sm rounded-pill px-3 py-2"
              />
              {error.password && <div className="text-danger mt-1">{error.password}</div>}
            </Form.Group>

            {/* Improved Forgot Password Link */}
            <div className="d-flex justify-content-end mb-3">
              <a
                href="/forgotpassword"
                className="text-primary fw-bold"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-100 rounded-pill shadow-lg py-2"
              style={{ background: '#1e7225', border: 'none' }}
            >
              Login
            </Button>
          </Form>

          <div className="mt-4 text-center">
            <small>
              Don't have an account?{' '}
              <a href="/signup" className="text-primary fw-bold" style={{ textDecoration: 'none' }}>
                Sign up
              </a>
            </small>
          </div>
        </Card>
      </div>
    </>
  );
}


