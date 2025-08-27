import React, { useContext } from 'react';
import { Navbar as BsNavbar, Nav, Button } from 'react-bootstrap';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <BsNavbar
      expand="lg"
      className="shadow-lg sticky-top p-0"
      style={{ 
        background: 'linear-gradient(90deg, #000610, #ae2929)',
        width: '100vw'
      }}
    >
      <div className="d-flex align-items-center justify-content-between w-100 px-4 py-3">
        {/* Brand */}
        <BsNavbar.Brand
          className="fw-bold fs-3 text-white"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(user ? `/${user.role.toLowerCase()}/dashboard` : '/')}
        >
          Expense Reimbursement System
        </BsNavbar.Brand>

        {/* Navigation buttons */}
        <Nav className="align-items-center gap-2">
          {user ? (
            <>
              <span className="fs-6 text-white">
                <strong>{user.username || user.email}</strong>
              </span>
              <Button
                variant="light"
                size="sm"
                className="shadow-sm rounded-pill px-3 py-1"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-light"
                size="sm"
                className="shadow-sm rounded-pill px-3 py-1"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="light"
                size="sm"
                className="shadow-lg rounded-pill px-3 py-1"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
}
