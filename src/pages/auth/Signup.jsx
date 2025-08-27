import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { signupApi } from '../../api/authApi';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    username: '',
    email: '',
    password: '',
    role: 'APPLICANT'
  });
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};
    if(!payload.username.trim()) {
      newError.username = 'Username is required';
    }else if(payload.username.trim().length <3){
      newError.username = 'Username must be at least 3 characters long';
    }

    if(!payload.email.trim()) {
      newError.email = 'Email is required';
    }

    if(!payload.password.trim()){
       newError.password = 'Password is required';
    }else if(payload.password.trim().length <5){
      newError.password = 'Password must be at least 5 characters long';
    }

    setError(newError);
    return Object.keys(newError).length === 0;

  }
  const handle = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if(!isValid) return ;

    try {
      await signupApi(payload);
      alert('Signup successful. Please login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: 'calc(100vh - 70px)',
          background: 'linear-gradient(120deg, #f5f7fa, #bdbdbd)',
          padding: '20px'
        }}
      >
        <Card
          className="shadow-lg rounded-4 p-4"
          style={{ maxWidth: 500, width: '100%' }}
        >
          <h3 className="fw-bold mb-4 text-center text-primary">Sign Up</h3>
          <Form onSubmit={handle}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={payload.username}
                onChange={e => {setPayload({ ...payload, username: e.target.value }); if(error.username) setError({...error, username : ''})}}
                placeholder="Enter username"
                // required
                className="shadow-sm rounded-pill px-3 py-2"
              />
            </Form.Group>
              {error.username && <div className="text-danger mb-2">{error.username}</div>}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={payload.email}
                onChange={e => {setPayload({ ...payload, email: e.target.value }); if(error.email) setError({...error, email: ''})}}
                placeholder="Enter email"
                // required
                className="shadow-sm rounded-pill px-3 py-2"
              />
            </Form.Group>
            {error.email && <div className="text-danger mb-2">{error.email}</div>}

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={payload.password}
                onChange={e => {setPayload({ ...payload, password: e.target.value }); if(error.password) setError({...error, password: ''})}}
                placeholder="Enter password"
                // required
                className="shadow-sm rounded-pill px-3 py-2"
              />
            </Form.Group>
            {error.password && <div className="text-danger mb-2">{error.password}</div>}

            <Form.Group className="mb-4">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={payload.role}
                onChange={e => setPayload({ ...payload, role: e.target.value })}
                className="shadow-sm rounded-pill px-3 py-2"
              >
                <option value="APPLICANT">Applicant</option>
                <option value="AGENT">Agent</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>
            <Button
              type="submit"
              className="w-100 rounded-pill shadow-lg py-2"
              style={{ background: '#1e7242', border: 'none' }}
            >
              Sign Up
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <small>
              Already have an account?{' '}
              <a href="/login" className="text-primary fw-bold">Login</a>
            </small>
          </div>
        </Card>
      </div>
    </>
  );
}
