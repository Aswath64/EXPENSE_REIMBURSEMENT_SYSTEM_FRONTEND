import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaFileAlt,
  FaHandHoldingUsd,
  FaCoins,
  FaUsers,
  FaSignOutAlt
} from 'react-icons/fa';

export default function Sidebar({ role }) {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: <FaHome />, path: `/${role.toLowerCase()}/dashboard` },
  ];

  if (role === 'APPLICANT') {
    menuItems.push(
      { label: 'Apply Reimbursement', icon: <FaHandHoldingUsd />, path: '/applicant/apply' },
      { label: 'My Applications', icon: <FaFileAlt />, path: '/applicant/my-applications' }
    );
  } else if (role === 'AGENT') {
    menuItems.push(
      { label: 'Assigned Applications', icon: <FaFileAlt />, path: '/agent/assigned' }
    );
  } else if (role === 'ADMIN') {
    menuItems.push(
      { label: 'Applications', icon: <FaFileAlt />, path: '/admin/applications' },
      { label: 'Reimbursement', icon: <FaCoins />, path: '/admin/loan-types' },
      { label: 'Users', icon: <FaUsers />, path: '/admin/users' }
    );
  }

  menuItems.push({ label: 'Logout', icon: <FaSignOutAlt />, path: '/logout' });

  return (
    <div
      className="d-flex flex-column bg-light shadow-lg vh-100 p-3"
      style={{
        minWidth: '220px',
        background: 'linear-gradient(90deg, #d6d8dc, #f1efee)',
        transition: 'all 0.3s'
      }}
    >
      <h5 className="mb-4">Menu</h5>
      <Nav className="flex-column">
        {menuItems.map((item, idx) => (
          <Nav.Link
            key={idx}
            onClick={() => navigate(item.path)}
            className="d-flex align-items-center mb-2 text-dark rounded px-2 py-2"
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e7f1ff'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span className="me-2 fs-5">{item.icon}</span>
            <span className="fs-6">{item.label}</span>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}
